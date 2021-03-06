'use strict'

const { expect } = require('chai'),
  { knex, migrate, rollback } = require('../../db'),
  model = require('../../models/admin')

// Hashed password: 'asdf'
const fixture = {
  username: 'testAdmin',
  realName: 'Test Admin',
  hash: '$2a$10$fMy8J5cXaImNf2s8FvipLuYkHgKWmTfdssY/lapIZ8iDOghG9qA0C'
}

// Hashed password: 'asdf'
const fixtureTwo = {
  username: 'testAdminTwo',
  realName: 'Test Admin Two',
  hash: '$2a$10$F9GK/UEgFpYTXQ/3vGw7DuTqOehisBiaBmYuj/zo.79gd2xu2EXym'
}

describe('models/admin', () => {
  beforeEach((done) => { migrate(() => done()) })
  afterEach((done) => { rollback(() => done()) })

  let adminId

  beforeEach((done) => {
    model.createAdmin(fixture, (err, id) => {
      if (err) { return done(err) }
      adminId = id
      return done()
    })
  })

  describe('createAdmin', () => {
    it('should create an admin', (done) => {
      model.createAdmin(fixtureTwo, (err, id) => {
        expect(err).to.not.be.ok
        expect(id).to.be.a('Number')
        model.getById(id, (err, admin) => {
          expect(admin.id).to.equal(id)
          expect(admin.username).to.equal(fixtureTwo.username)
          expect(admin.realName).to.equal(fixtureTwo.realName)
          expect(admin.hash).to.equal(fixtureTwo.hash)
          return done()
        })
      })
    })
  })

  describe('hashPassword', () => {
    it('should take a password, and return the hash/salt string', (done) => {
      model.hashPassword('ASDF1234', (err, hash) => {
        expect(err).not.to.be.ok
        expect(hash).to.be.a('string')
        return done()
      })
    })

    it('should not have the same hash/salt string for the same password', (done) => {
      model.hashPassword('ASDF1234', (err, hash) => {
        expect(err).not.to.be.ok
        expect(hash).to.be.a('string')
        model.hashPassword('ASDF1234', (err, hashTwo) => {
          expect(err).not.to.be.ok
          expect(hash).to.be.a('string')
          expect(hash).not.to.equal(hashTwo)
          return done()
        })
      })
    })

  })

  describe('checkPassword', () => {
    it('should cb true if the password is correct', (done) => {
      model.checkPassword(adminId, 'asdf', (err, correct) => {
        expect(err).not.to.be.ok
        expect(correct).to.be.true
        return done()
      })
    })

    it('should cb false if the password is incorrect', (done) => {
      model.checkPassword(adminId, 'asdff', (err, correct) => {
        expect(err).not.to.be.ok
        expect(correct).to.be.false
        return done()
      })
    })
  })

  describe('serializePassport', () => {
    it('should call back with the id of the object given', () => {
      model.serializePassport({ id: 123 }, (err, id) => {
        expect(err).to.not.be.ok
        expect(id).to.equal(123)
      })
    })
  })

  describe('authenticatePassport', () => {
    it('should call back with false if no username given', (done) => {
      model.authenticatePassport(null, 'asdf', (err, user) => {
        expect(err).not.to.be.ok
        expect(user).to.equal(false)
        return done()
      })
    })

    it('should call back with false if no password given', (done) => {
      model.authenticatePassport(fixture.username, null, (err, user) => {
        expect(err).not.to.be.ok
        expect(user).to.equal(false)
        return done()
      })
    })

    it('should call back with false if the username does not exist', (done) => {
      model.authenticatePassport('nonexistentuser', 'password', (err, user) => {
        expect(err).not.to.be.ok
        expect(user).to.equal(false)
        return done()
      })
    })

    it('should call back with the users\' data if password is correct', (done) => {
      model.authenticatePassport(fixture.username, 'asdf', (err, user) => {
        expect(err).to.not.be.ok
        expect(user.username).to.equal(fixture.username)
        expect(user.realName).to.equal(fixture.realName)
        return done()
      })
    })

    it('should call back with false if password is incorrect', (done) => {
      model.authenticatePassport(fixture.username, 'wrongpassword', (err, user) => {
        expect(err).to.not.be.ok
        expect(user).to.equal(false)
        return done()
      })
    })

  })

  describe('deserializePassport', () => {
    it('should deserialize admin from database, call back with id/username', (done) => {
      model.deserializePassport(adminId, (err, admin) => {
        expect(err).not.to.be.ok
        expect(admin).to.deep.equal({
          id: 1,
          username: 'testAdmin'
        })
        return done()
      })
    })
  })
})

