'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isBoolean2 = require('lodash/isBoolean');

var _isBoolean3 = _interopRequireDefault(_isBoolean2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _isPlainObject2 = require('lodash/isPlainObject');

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = require('mobx');

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  Vanilla JavaScript Functions
*/
var VJF = function () {
  function VJF(plugin, _ref) {
    var _ref$promises = _ref.promises,
        promises = _ref$promises === undefined ? [] : _ref$promises,
        _ref$options = _ref.options,
        options = _ref$options === undefined ? {} : _ref$options;

    _classCallCheck(this, VJF);

    this.validator = null;

    if ((0, _isPlainObject3.default)(plugin)) {
      this.validator = plugin;
    }

    this.promises = promises;
    this.options = options;
  }

  _createClass(VJF, [{
    key: 'validateField',
    value: function validateField(field, form) {
      var _this = this;

      // exit if field does not have validation functions
      if (!field.validators) return;

      // get validators from validate property
      var $fn = (0, _mobx.toJS)(field.validators);

      // map only if is an array of validator functions
      if ((0, _isArray3.default)($fn)) {
        $fn.map(function (fn) {
          return _this.collectData(fn, field, form);
        });
      }

      // it's just one function
      if ((0, _isFunction3.default)($fn)) {
        this.collectData($fn, field, form);
      }

      // execute the function validation
      this.executeValidation(field);
    }
  }, {
    key: 'collectData',
    value: function collectData($fn, field, form) {
      var _this2 = this;

      var res = this.handleFunctionResult($fn, field, form);

      // check and execute only if is a promise
      if (_utils2.default.isPromise(res)) {
        var $p = res.then(function ($res) {
          return field.setValidationAsyncData($res[0], $res[1]);
        }).then(function () {
          return _this2.executeAsyncValidation(field);
        }).then(function () {
          return field.showAsyncErrors();
        });

        // push the promise into array
        this.promises.push($p);
        return;
      }

      // is a plain function
      field.validationFunctionsData.unshift({
        valid: res[0],
        message: res[1]
      });
    }
  }, {
    key: 'executeValidation',
    value: function executeValidation(field) {
      // otherwise find an error message to show
      field.validationFunctionsData.map(function (rule) {
        return rule.valid === false && field.invalidate(rule.message);
      });
    }
  }, {
    key: 'executeAsyncValidation',
    value: function executeAsyncValidation(field) {
      if (field.validationAsyncData.valid === false) {
        field.invalidate(field.validationAsyncData.message, true);
      }
    }
  }, {
    key: 'handleFunctionResult',
    value: function handleFunctionResult($fn, field, form) {
      // executre validation function
      var res = $fn({ field: field, form: form, validator: this.validator });

      /**
        Handle "array"
      */
      if ((0, _isArray3.default)(res)) {
        var isValid = res[0] || false;
        var message = res[1] || 'Error';
        return [isValid, message];
      }

      /**
        Handle "boolean"
      */
      if ((0, _isBoolean3.default)(res)) {
        return [res, 'Error'];
      }

      /**
        Handle "string"
      */
      if ((0, _isString3.default)(res)) {
        return [false, res];
      }

      /**
        Handle "object / promise"
      */
      if (_utils2.default.isPromise(res)) {
        return res; // the promise
      }

      /**
        Handle other cases
      */
      return [false, 'Error'];
    }
  }]);

  return VJF;
}();

exports.default = VJF;
module.exports = exports['default'];