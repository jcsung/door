'use strict'

const { knex, query, queryRow, insertRow, queryRaw } = require('../db')

const { camelizeObject, snakeifyObject, getTimestamp } = require('../lib/util'),
  userModel = require('./user'),
  { pick } = require('ramda'),
  moment = require('moment'),
  bcrypt = require('bcrypt'),
  config = require('../config')

exports.tableName = 'swipe'
exports.queryBase = () => knex(exports.tableName).select('*')

exports.fields = [
  'userId',
  'accessGranted',
  'cardHash',
  'timestamp'
]

exports.createSwipe = (swipe, cb) => {
  insertRow(exports.tableName, exports.fields, Object.assign(swipe, {
    timestamp: getTimestamp()
  }), cb)
}

exports.getSwipesByUser = (userId, cb) => query(exports.queryBase(), { userId }, cb)

exports.getSwipes = (pageNumber, limit, cb) => {
  let sql = knex.raw(`select s.*, u.username, t.total_rows from swipe s
    left join user u on u.id = s.user_id,
    (select count(*) total_rows from swipe) t
    order by timestamp desc limit ? offset ?`,
    [limit, (limit * (pageNumber - 1))])

  queryRaw(sql, cb)
}

