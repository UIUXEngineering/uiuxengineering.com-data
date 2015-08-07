/**
 * Created by jerryorta-dev on 8/6/15.
 */

// All **ECMAScript 5** native function implementations that we hope to use
// are declared here.
var nativeIsArray = Array.isArray,
    nativeKeys = Object.keys,
    //nativeCreate = Object.create,
    ObjProto = Object.prototype,
    toString = ObjProto.toString;


var TYPE = {
    OBJECT: 'Object',
    ARRAY: 'Array',
    ARGUMENTS: 'Arguments',
    FUNCTION: 'Function',
    STRING: 'String',
    NUMBER: 'Number',
    DATE: 'Date',
    REGEX: 'RegExp',
    ERROR: 'Error'
};

module.exports.TYPE = TYPE;


module.exports.isObject = function (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

module.exports.isArray = nativeIsArray || function (obj) {
        return toString.call(obj) === '[object Array]';
    };

module.exports.isNull = function (obj) {
    return obj === null;
};

// Is a given variable undefined?
module.exports.isUndefined = function (obj) {
    return obj === void 0;
};

// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.

function isType(obj, type) {
    return toString.call(obj) === '[object ' + type + ']';
}

//Make WebStorm Happy with error and syntax checking
module.exports.isArguments = function(obj) {
  return isType(obj, TYPE.ARGUMENTS);
};

module.exports.isFunction = function(obj) {
  return isType(obj, TYPE.FUNCTION);
};

module.exports.isString = function(obj) {
  return isType(obj, TYPE.STRING);
};

module.exports.isNumber = function(obj) {
  return isType(obj, TYPE.NUMBER);
};

module.exports.isDate = function(obj) {
  return isType(obj, TYPE.DATE);
};

module.exports.isRegExp = function(obj) {
  return isType(obj, TYPE.REGEX);
};

module.exports.isError = function(obj) {
  return isType(obj, TYPE.ERROR);
};


function getType(obj) {
    var _ = module.exports;

    if (_.isObject(obj)) { return TYPE.OBJECT }
    if (_.isArray(obj)) { return TYPE.ARRAY }
    if (_.isArguments(obj)) { return TYPE.ARGUMENTS }
    if (_.isFunction(obj)) { return TYPE.FUNCTION }
    if (_.isString(obj)) { return TYPE.STRING }
    if (_.isNumber(obj)) { return TYPE.NUMBER }
    if (_.isDate(obj)) { return TYPE.DATE }
    if (_.isRegExp(obj)) { return TYPE.REGEX }
    if (_.isError(obj)) { return TYPE.ERROR }

}

module.exports.getType = getType;

module.exports.createDataContainer = function(type) {
    var _type;
    switch (type) {
        case TYPE.STRING:
            _type = "";
            break;
        case TYPE.OBJECT:
            _type = {};
            break;
        case TYPE.ARRAY:
            _type = [];
            break;
        default :
            _type = ""
    }

    return _type;
};
