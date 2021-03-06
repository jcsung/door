'use strict'

module.exports = Object.assign({
  port: '9001',
  doorOpen: '0',
  doorClosed: '1',
  sslKey: 'ssl/server.key',
  sslCert: 'ssl/server.crt',
  sslCa: 'ssl/ca.crt',
  bcryptSaltRounds: 10,
  itemsPerPage: 25
}, ({
  test: {
    secret: 'mysecret123',
    database: {
      client: 'sqlite3',
      connection: {
        filename: ':memory:'
      },
      migrations: {
        directory: 'db/migrations'
      },
      useNullAsDefault: true
    }
  },
  development: {
    secret: 'mysecret123',
    database: {
      client: 'sqlite3',
      connection: {
        filename: 'db/development.sqlite3'
      },
      migrations: {
        directory: 'db/migrations'
      },
      useNullAsDefault: true
    }
  }

})[process.env.NODE_ENV])

