'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _isNil2 = require('lodash/isNil');

var _isNil3 = _interopRequireDefault(_isNil2);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _trimStart2 = require('lodash/trimStart');

var _trimStart3 = _interopRequireDefault(_trimStart2);

var _desc, _value, _obj;

var _mobx = require('mobx');

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _parser = require('../parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
  Field Initializer
*/
exports.default = (_obj = {
  initFields: function initFields(initial, update) {
    var _this = this;

    var $path = function $path(key) {
      return (0, _trimStart3.default)([_this.path, key].join('.'), '.');
    };

    var fields = void 0;
    fields = _parser2.default.prepareFieldsData(initial, this.state.strict);
    fields = _parser2.default.mergeSchemaDefaults(fields, this.validator);

    // create fields
    (0, _each3.default)(fields, function (field, key) {
      return (0, _isNil3.default)(_this.select($path(key), null, false)) && _this.initField(key, $path(key), field, update);
    });
  },
  initField: function initField(key, path, data) {
    var update = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var initial = this.state.get('current', 'props');
    var struct = _utils2.default.pathToStruct(path);
    // try to get props from separated objects
    var $try = function $try(prop) {
      return (0, _get3.default)(initial[prop], struct);
    };

    var props = {
      $value: $try('values'),
      $label: $try('labels'),
      $placeholder: $try('placeholders'),
      $default: $try('defaults'),
      $initial: $try('initials'),
      $disabled: $try('disabled'),
      $bindings: $try('bindings'),
      $type: $try('types'),
      $options: $try('options'),
      $extra: $try('extra'),
      $related: $try('related'),
      $hooks: $try('hooks'),
      $handlers: $try('handlers'),
      $validatedWith: $try('validatedWith'),
      $validators: $try('validators'),
      $rules: $try('rules'),
      $observers: $try('observers'),
      $interceptors: $try('interceptors'),
      $input: $try('input'),
      $output: $try('output')
    };

    var field = this.state.form.makeField({
      key: key, path: path, data: data, props: props, update: update, state: this.state
    });

    this.fields.merge(_defineProperty({}, key, field));

    return field;
  }
}, (_applyDecoratedDescriptor(_obj, 'initField', [_mobx.action], Object.getOwnPropertyDescriptor(_obj, 'initField'), _obj)), _obj);
module.exports = exports['default'];