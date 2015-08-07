/**
 * Created by jerryorta-dev on 8/6/15.
 */

var schemaValidate = require('./schemaObject');
var typeUtils = require('./typeUtils');
var TYPE = typeUtils.TYPE;



function createFromSchema(dataObject, schema) {

    //Return Collection
    var collection = [];

   for ( var dataSet in dataObject ) {

       var i = 0, iLen = dataObject[dataSet].length;
       for ( i; i < iLen; i++ ) {
           collection.push( schemaValidate.validateWithSchema( dataObject[dataSet], schema ) );
       }

   }


    return {
        schema: schema,
        data: JSON.stringify(collection, null, 2)
    };

}


module.exports.createCollection = createFromSchema;