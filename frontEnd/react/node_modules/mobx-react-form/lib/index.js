'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = exports.Form = undefined;

var _mobx = require('mobx');

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _Initializer = require('./shared/Initializer');

var _Initializer2 = _interopRequireDefault(_Initializer);

var _Helpers = require('./shared/Helpers');

var _Helpers2 = _interopRequireDefault(_Helpers);

var _Actions = require('./shared/Actions');

var _Actions2 = _interopRequireDefault(_Actions);

var _Utils = require('./shared/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _Events = require('./shared/Events');

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TEST = process.env.TEST;

/**
  Enables MobX strict mode globally (TEST only).
  - - - - - - - - - - - - - - - - - -
  In strict mode, it is not allowed to
  change any state outside of an action
*/


/* shared prototype methods */

if (TEST) (0, _mobx.useStrict)(true);

/**
  Extend Classes with Prototype
  - - - - - - - - - - - - - - - - - -
  Cannot use Object.assign as @action
  methods on mixins are non-enumerable
*/
var extend = function extend($class, $obj) {
  return $obj.forEach(function (mixin) {
    return Object.getOwnPropertyNames(mixin).forEach(function (name) {
      return $class.prototype[name] = mixin[name];
    });
  });
}; // eslint-disable-line

var shared = [_Initializer2.default, _Actions2.default, _Helpers2.default, _Utils2.default, _Events2.default];

extend(_Form2.default, shared.concat(_Form.prototypes));
extend(_Field2.default, shared.concat(_Field.prototypes));

exports.default = _Form2.default;
exports.Form = _Form2.default;
exports.Field = _Field2.default;