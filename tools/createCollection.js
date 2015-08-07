/**
 * Created by jerryorta-dev on 8/6/15.
 */

var wrap = require('./wrapperObject');
var typeUtils = require('./typeUtils');
var TYPE = typeUtils.TYPE;



function buildObject(data, key, schema) {
    console.log('buildObject:: data', data);
    //console.log('buildObject: key', key);
    //console.log('buildObject: schema', schema);

    //build off of schema
    var wrapper = wrap.createWrapper(
        schema.type,
        TYPE,
        typeUtils
    );


    if (schema.hasOwnProperty('properties')) {

        var schemaProperties = schema.properties;

        for (var prop in schemaProperties) {
            if (data[prop]) {
                console.log('buildObject data[prop]::', data[prop]);
                console.log('buildObject schemaProperties::', schemaProperties);
                wrapper.add( buildSchemaObject( data[prop], schemaProperties  ))
            }

            //TODO create empty data here

        }

    } else {

        if (data[key]) {
            wrapper.add(data, key);
        }

    }

    return wrapper;

}

//First level of schema object
function buildSchemaObject(list, schemaProperties) {

    //console.log('buildSchemaObject list:: ', list);
    //console.log('buildSchemaObject schemaProperties:: ', schemaProperties);

    var wrapper = wrap.createWrapper(
        TYPE.OBJECT,
        TYPE,
        typeUtils
    );

    for (var prop in schemaProperties) {
        if ( list && list[ prop ] ) {
            wrapper.add( buildObject( list[ prop ], prop, schemaProperties[prop] ), prop );
        }
    }

    return wrapper;
}

//function iterObject(list, key, schema) {
//
//}

function iterArray(list, dataSetName, schemaProperties) {

    console.log('iterArray:: list.length', list.length);
    //console.log('iterArray: list', list);
    //console.log('iterArray: dataSetName', dataSetName);
    //console.log('iterArray: schemaProperties', schemaProperties);

    var collection = wrap.createWrapper(TYPE.ARRAY, TYPE, typeUtils);
    var i = 0, iLen = list.length;

    for (i; i < iLen; i++) {

        if (list[i]) {
            if (schemaProperties.dataSet) {
                list[i]['dataSet'] = dataSetName;
            }
            //console.log('iterArray: list[i]', list[i]);

            collection.add( buildSchemaObject(list[i], schemaProperties) );
        }

    }

    return collection;

}


function createFromSchema(schema, dataLists) {

    //Return Collection


    var collection = wrap.createWrapper(TYPE.ARRAY, TYPE, typeUtils);
    collection.isArray = true;

    if (typeUtils.isObject(dataLists)) {
        for (var prop in dataLists) {
            //console.log('createFromSchema', prop);
            if (typeUtils.isArray(dataLists[prop])) {
                collection.add( iterArray( dataLists[prop], prop, schema.properties ) );
            }
        }
    }



    return {
        schema: schema,
        data: collection.getJSON()
    };

}


module.exports.createCollection = createFromSchema;