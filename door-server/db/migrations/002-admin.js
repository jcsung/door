'use strict'

exports.up = function (knex) {
  return knex.schema.createTable('admin', function (t) {
    t.increments('id')
    t.text('username')
    t.text('real_name')
    t.text('hash')
    t.timestamp('registration_date')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('admin')
}

