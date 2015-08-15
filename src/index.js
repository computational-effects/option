'use strict';

var pbp = require('pbp');
var sum = require('ce-sum');
var mixin = require('ce-mixin').mixin;
var Unit = require('ce-unit').Unit;

var enumerableGet = pbp.enumerableGet;
var enumerableValue = pbp.enumerableValue;
var value = pbp.value;

var Option = Object.create(sum.Either, {
  of: enumerableValue(Some),
  isSome: enumerableGet(function() {
    return false;
  }),
  isNone: enumerableGet(function() {
    return false;
  }),
});

var None = mixin(sum.Left(Unit), Object.create(Option, {
  type: value('None'),
  args: value([]),
  ctor: value(function() {
    return None;
  }),
  isNone: enumerableGet(function() {
    return true;
  }),
}));

function Some(x) {
  return mixin(sum.Right(x), Object.create(Option, {
    type: value('Some'),
    args: value([x]),
    ctor: value(Some),
    isSome: enumerableGet(function() {
      return true;
    }),
  }));
};

module.exports = {
  None: None,
  Option: Option,
  Some: Some,
};
