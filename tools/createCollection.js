/**
 * Created by jerryorta-dev on 8/6/15.
 */
var Validator = require('jsonschema').Validator;
var SchemaObject = require('node-schema-object');
var _ = require('lodash');
var v = new Validator();
var utils = require('./utils');

//schemas
var baseSchema = require('../schemas/base-schema');


Object.defineProperty(Object.prototype, "extend", {
    enumerable: false,
    value: function(from) {
        var props = Object.getOwnPropertyNames(from);
        var dest = this;
        props.forEach(function(name) {
            if (name in dest) {
                var destination = Object.getOwnPropertyDescriptor(from, name);
                Object.defineProperty(dest, name, destination);
            }
        });
        return this;
    }
});

function isValidSchemaObject(data, baseSchema) {

    //Not Valid if length is > 0;
    var validate = v.validate(data, baseSchema);
    var numberOfErrors = validate.errors.length;

    if (numberOfErrors) {
        console.log(validate);
        throw new Error(validate);
    }

    return !(Boolean(numberOfErrors));

}


function addPropertyToDataObject(data, prop, value) {
    data[prop] = value;
}

function createFromSchema(allRawDataSets) {

    //Return Collection
    var collection = [];
    var tags = utils.getValuesArray(allRawDataSets, 'tags').data;
    var DataObject = new SchemaObject( baseSchema );


    //Iterate All Data sets from gulp.src('data/**/*.json')
    for (var dataSet in allRawDataSets) {

        console.log("Copying " + allRawDataSets[dataSet].length + " records from " + dataSet);

        //Iterate each data object in dataSet
        var i = 0, iLen = allRawDataSets[dataSet].length;
        for (i; i < iLen; i++) {

            //Add dataSet Property to data object to have reference
            //To dataSet
            if (!allRawDataSets[dataSet][i]['dataSet']) {
                addPropertyToDataObject(allRawDataSets[dataSet][i], 'dataSet', dataSet);
            }

            //Validate Schemas
            if (isValidSchemaObject(allRawDataSets[dataSet][i], baseSchema)) {

                //var newDataObject = new DataObject( JSON.stringify(allRawDataSets[dataSet][i], null, 2) );
                collection.push( allRawDataSets[dataSet][i] );

            }
        }

    }

    return {
        schema: {
          baseSchema: baseSchema
        },
        tags: tags,
        items: collection
    };

}


module.exports.createCollection = createFromSchema;