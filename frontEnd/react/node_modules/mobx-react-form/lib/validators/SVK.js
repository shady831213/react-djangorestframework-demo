'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _isNaN2 = require('lodash/isNaN');

var _isNaN3 = _interopRequireDefault(_isNaN2);

var _isNull2 = require('lodash/isNull');

var _isNull3 = _interopRequireDefault(_isNull2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _trim2 = require('lodash/trim');

var _trim3 = _interopRequireDefault(_trim2);

var _trimStart2 = require('lodash/trimStart');

var _trimStart3 = _interopRequireDefault(_trimStart2);

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  Schema Validation Keywords

    const plugins = {
      svk: {
        package: ajv,
        extend: callback,
      },
    };

*/
var SVK = function () {
  function SVK(plugin) {
    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SVK);

    this.validate = null;
    this.extend = null;
    this.promises = [];
    this.schema = {};

    this.assignInitData(plugin, obj);
    this.initAJV(plugin);
  }

  _createClass(SVK, [{
    key: 'assignInitData',
    value: function assignInitData(plugin, _ref) {
      var _ref$options = _ref.options,
          options = _ref$options === undefined ? {} : _ref$options,
          _ref$schema = _ref.schema,
          schema = _ref$schema === undefined ? {} : _ref$schema,
          _ref$promises = _ref.promises,
          promises = _ref$promises === undefined ? [] : _ref$promises;

      options.set({
        ajv: {
          v5: true,
          allErrors: true,
          coerceTypes: true,
          errorDataPath: 'property'
        }
      });

      this.options = options;
      this.schema = schema;
      this.promises = promises;
      this.extend = plugin.extend;
    }
  }, {
    key: 'initAJV',
    value: function initAJV(plugin) {
      if (!this.schema) return;
      // get ajv package
      var AJV = plugin.package || plugin;
      // create ajv instance
      var ajvInstance = new AJV(this.options.get('ajv'));
      // extend ajv using "extend" callback
      if ((0, _isFunction3.default)(this.extend)) this.extend(ajvInstance);
      // create ajvInstance validator (compiling rules)
      this.validate = ajvInstance.compile(this.schema);
    }
  }, {
    key: 'validateField',
    value: function validateField(field) {
      var _this = this;

      var data = _defineProperty({}, field.path, field.validatedValue);
      var validate = this.validate(this.parseValues(data));
      // check if is $async schema
      if (_utils2.default.isPromise(validate)) {
        var $p = validate.then(function () {
          return field.setValidationAsyncData(true);
        }).catch(function (err) {
          return err && _this.handleAsyncError(field, err.errors);
        }).then(function () {
          return _this.executeAsyncValidation(field);
        }).then(function () {
          return field.showAsyncErrors();
        });

        // push the promise into array
        this.promises.push($p);
        return;
      }
      // check sync errors
      this.handleSyncError(field, this.validate.errors);
    }
  }, {
    key: 'handleSyncError',
    value: function handleSyncError(field, errors) {
      var fieldErrorObj = this.findError(field.key, errors);
      // if fieldErrorObj is not undefined, the current field is invalid.
      if ((0, _isUndefined3.default)(fieldErrorObj)) return;
      // the current field is now invalid
      // add additional info to the message
      var msg = field.label + ' ' + fieldErrorObj.message;
      // invalidate the current field with message
      field.invalidate(msg);
    }
  }, {
    key: 'handleAsyncError',
    value: function handleAsyncError(field, errors) {
      // find current field error message from ajv errors
      var fieldErrorObj = this.findError(field.path, errors);
      // if fieldErrorObj is not undefined, the current field is invalid.
      if ((0, _isUndefined3.default)(fieldErrorObj)) return;
      // the current field is now invalid
      // add additional info to the message
      var msg = field.label + ' ' + fieldErrorObj.message;
      // set async validation data on the field
      field.setValidationAsyncData(false, msg);
    }
  }, {
    key: 'findError',
    value: function findError(path, errors) {
      return (0, _find3.default)(errors, function (_ref2) {
        var dataPath = _ref2.dataPath;

        var $dataPath = void 0;
        $dataPath = (0, _trimStart3.default)(dataPath, '.');
        $dataPath = (0, _trim3.default)($dataPath, '[\'');
        $dataPath = (0, _trim3.default)($dataPath, '\']');
        return (0, _includes3.default)($dataPath, '' + path);
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
    key: 'parseValues',
    value: function parseValues(values) {
      if (this.options.get('allowRequired') === true) {
        return (0, _omitBy3.default)(values, _isEmpty3.default || _isNull3.default || _isUndefined3.default || _isNaN3.default);
      }
      return values;
    }
  }]);

  return SVK;
}();

exports.default = SVK;
module.exports = exports['default'];