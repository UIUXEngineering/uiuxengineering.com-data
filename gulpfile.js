/**
 * Created by jerryorta-dev on 8/6/15.
 */
var gulp = require('gulp');
var path = require('path');
var jsoncombine = require("gulp-jsoncombine");
var dataCollection = require('./tools/createCollection');



gulp.task('build', function() {
    // place code for your default task here
    return gulp.src('data/**/*.json')
        .pipe(jsoncombine("all.json",function(data){

            var collection = dataCollection.createCollection( data );

            //Buffer is a native and global nodejs class
            return new Buffer(JSON.stringify(collection, null, 2), 'utf8');
        }))
        .pipe(gulp.dest("./dist"));

});