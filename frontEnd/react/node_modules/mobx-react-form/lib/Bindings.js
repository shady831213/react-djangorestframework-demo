'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _isPlainObject2 = require('lodash/isPlainObject');

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _merge5 = require('lodash/merge');

var _merge6 = _interopRequireDefault(_merge5);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bindings = function () {
  function Bindings() {
    _classCallCheck(this, Bindings);

    this.templates = {
      // default: ({ field, props, keys, $try }) => ({
      //   [keys.id]: $try(props.id, field.id),
      // }),
    };
    this.rewriters = {
      default: {
        id: 'id',
        name: 'name',
        type: 'type',
        value: 'value',
        checked: 'checked',
        label: 'label',
        placeholder: 'placeholder',
        disabled: 'disabled',
        onChange: 'onChange',
        onBlur: 'onBlur',
        onFocus: 'onFocus',
        autoFocus: 'autoFocus'
      }
    };
  }

  _createClass(Bindings, [{
    key: 'load',
    value: function load(field) {
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
      var props = arguments[2];

      if ((0, _has3.default)(this.rewriters, name)) {
        var $bindings = {};

        (0, _each3.default)(this.rewriters[name], function ($v, $k) {
          return (0, _merge6.default)($bindings, _defineProperty({}, $v, (0, _utils.$try)(props[$k], field[$k])));
        });

        return $bindings;
      }

      return this.templates[name]({
        keys: this.rewriters[name],
        $try: _utils.$try,
        field: field,
        props: props
      });
    }
  }, {
    key: 'register',
    value: function register(bindings) {
      var _this = this;

      (0, _each3.default)(bindings, function (val, key) {
        if ((0, _isFunction3.default)(val)) (0, _merge6.default)(_this.templates, _defineProperty({}, key, val));
        if ((0, _isPlainObject3.default)(val)) (0, _merge6.default)(_this.rewriters, _defineProperty({}, key, val));
      });

      return this;
    }
  }]);

  return Bindings;
}();

exports.default = Bindings;
module.exports = exports['default'];