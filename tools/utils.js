/**
 * Created by jerry.orta on 8/10/15.
 */
var _ = require('lodash');

function flattenUniqSort(values) {
    values = _.flatten(values);
    values = _.uniq(values);
    values = _.sortBy(values, function(num) {
        return num;
    });

    return values;
}


module.exports.getValuesArray = function getValuesArray(allRawDataSets, prop) {
    //Return Collection
    var values = [];

    //Iterate All Data sets from gulp.src('data/**/*.json')
    for (var dataSet in allRawDataSets) {

        //console.log("Copying " + allRawDataSets[dataSet].length + " records from " + dataSet);

        //Iterate each data object in dataSet
        var i = 0, iLen = allRawDataSets[dataSet].length;
        for (i; i < iLen; i++) {

            values.push( _.get(allRawDataSets[dataSet][i], prop) );

        }

    }



    return {
        data: flattenUniqSort(values)
    };
};


module.exports.dataSetList = function dataSetList(dataSetObject) {
    var values = [];

    //Iterate All Data sets from gulp.src('data/**/*.json')
    for (var dataSet in dataSetObject) {

        values.push(dataSet);

    }

    return {
        data: flattenUniqSort(values)
    };
};