/**
 * Created by jerryorta-dev on 8/6/15.
 */

function WrapperObject(type, types, typeUtils) {
    this.type = type;
    this.isWrapper = true;
    this.data = null;
    this.TYPES = types;
    this.typeUtils = typeUtils;

    this.isString = false;
    this.isNumber = false;
    this.isArray = false;
    this.isObject = false;

    if (type == this.TYPES.STRING) {
        this.data = "";
        this.isString = true;
    }

    if (type == this.TYPES.ARRAY) {
        this.data = [];
        this.isArray = true;
    }

    if (type == this.TYPES.OBJECT) {
        this.data = {};
        this.isObject = true;
    }

    if (type == this.TYPES.NUMBER) {
        this.data = 0;
        this.isNumber = true;
    }

}

WrapperObject.prototype = {

    constructor: WrapperObject,

    add: function (value, key) {

        if (!value) {
            throw new Error("Error: WrapperObject - no data ");
        }

        if (value.isWrapper) {
            value = value.data;
        }

        //console.log('add', value, key);

        if (this.isArray) {
            if (this.typeUtils.isArray(value)) {
                this.data = this.data.concat(value);
            } else {
                this.data.push(value);
            }
        }

        if (this.isString) {
            this.data += value;
        }

        if (this.isObject) {

            if (!key) {
                throw new Error("Error: WrapperObject - Need key for value " + value.toString());
            } else {
                this.data[key] = value;
            }
        }


    },




    getJSON: function () {
        return JSON.stringify(this.data, null, 2);
    }
};

module.exports.createWrapper = function(type, dataContainer, types, typeUtils) {
  return new WrapperObject(type, dataContainer, types, typeUtils);
};
