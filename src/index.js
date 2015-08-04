'use strict';

var pbp = require('pbp');
var sum = require('ce-sum');
var mixin = require('ce-mixin').mixin;
var Unit = require('ce-unit').Unit;

var enumerableValue = pbp.enumerableValue;
var value = pbp.value;

var None, Some;

var Option = Object.create(sum.Either, {
  of: enumerableValue(Some),
});

None = mixin(sum.Left(Unit), Object.create(Option, {
  type: value('None'),
  args: value([]),
  ctor: value(function() {
    return None;
  }),
}));

Some = function(x) {
  return mixin(sum.Right(x), Object.create(Option, {
    type: value('Some'),
    args: value([x]),
    ctor: value(Some),
  }));
};

module.exports = {
  None: None,
  Option: Option,
  Some: Some,
};
