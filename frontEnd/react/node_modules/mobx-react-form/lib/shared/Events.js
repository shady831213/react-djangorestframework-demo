'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _merge3 = require('lodash/merge');

var _merge4 = _interopRequireDefault(_merge3);

var _mobx = require('mobx');

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _parser = require('../parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
  Field Events
*/
exports.default = {

  /**
   MobX Event (observe/intercept)
   */
  MOBXEvent: function MOBXEvent(_ref) {
    var _this = this;

    var _ref$path = _ref.path,
        path = _ref$path === undefined ? null : _ref$path,
        _ref$key = _ref.key,
        key = _ref$key === undefined ? 'value' : _ref$key,
        call = _ref.call,
        type = _ref.type;

    var $instance = this.select(path || this.path, null, null) || this;

    var $call = function $call(change) {
      return call.apply(null, [{
        change: change,
        form: _this.state.form,
        path: $instance.path || null,
        field: $instance.path ? $instance : null
      }]);
    };

    var fn = void 0;
    var ffn = void 0;

    if (type === 'observer') {
      fn = _mobx.observe;
      ffn = $instance.fields.observe;
    }

    if (type === 'interceptor') {
      // eslint-disable-next-line
      key = '$' + key;
      fn = _mobx.intercept;
      ffn = $instance.fields.intercept;
    }

    var $dkey = $instance.path ? key + '@' + $instance.path : key;

    (0, _merge4.default)(this.state.disposers[type], _defineProperty({}, $dkey, key === 'fields' ? ffn.apply(function (change) {
      return $call(change);
    }) : fn($instance, key, function (change) {
      return $call(change);
    })));
  },


  /**
   Dispose MOBX Events
   */
  dispose: function dispose() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (this.path && opt) return this.disposeSingle(opt);
    return this.disposeAll(opt);
  },


  /**
   Dispose All Events (observe/intercept)
   */
  disposeAll: function disposeAll() {
    var dispose = function dispose(disposer) {
      return disposer.apply();
    };
    (0, _each3.default)(this.state.disposers.interceptor, dispose);
    (0, _each3.default)(this.state.disposers.observer, dispose);
    this.state.disposers = { interceptor: {}, observer: {} };
    return null;
  },


  /**
   Dispose Single Event (observe/intercept)
   */
  disposeSingle: function disposeSingle(_ref2) {
    var type = _ref2.type,
        _ref2$key = _ref2.key,
        key = _ref2$key === undefined ? 'value' : _ref2$key,
        _ref2$path = _ref2.path,
        path = _ref2$path === undefined ? null : _ref2$path;

    var $path = _parser2.default.parsePath(_utils2.default.$try(path, this.path));
    // eslint-disable-next-line
    if (type === 'interceptor') key = '$' + key; // target observables
    this.state.disposers[type][key + '@' + $path].apply();
    delete this.state.disposers[type][key + '@' + $path];
  }
};
module.exports = exports['default'];