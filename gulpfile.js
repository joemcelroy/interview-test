var gulp = require('gulp');
var concat = require('gulp-concat');
var html2js = require('gulp-html2js');
var del = require('del');
var karma = require('gulp-karma');

var paths = {
  appScripts: ['client/src/**/*.js'],
  vendorScripts: [
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-ui-utils/ui-utils.js',
    'bower_components/angular-ui-bootstrap-bower/ui-bootstrap.js',
    'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
    'bower_components/underscore/underscore.js'
  ],
  css: [
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'public/stylesheets/style.css'
  ],
  testPaths: [
    'public/build/vendor.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'public/build/app.js',
    'client/test/unit/**/*.js'
  ]
};

gulp.task('test', function() {
  gulp.src(paths.testPaths)
    .pipe(karma({
      configFile: 'client/test/conf/karma.conf.js',
      action:'run'
    }))
    .on('error', function(err){
      console.log(err);
    })

})

gulp.watch(paths.testPaths, ['test']);


gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('templates', ['clean'], function() {
  gulp.src('client/src/partials/**/*.html')
    .pipe(html2js({
      outputModuleName:'opentable-templates',
      base:"client/src"
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('public/build'))
})

var createConcatTask = function(name, pathsGlob, concatName ) {
  gulp.task(name, ['clean'], function() {
    return gulp.src(pathsGlob)
      .pipe(concat(concatName))
      .pipe(gulp.dest('public/build'));
  });

  gulp.watch(pathsGlob, [name]);

}

createConcatTask('appScripts', paths.appScripts, 'app.js');
createConcatTask('vendorScripts', paths.vendorScripts, 'vendor.js');
createConcatTask('css', paths.css, 'app.css');


// The default task (called when you run `gulp` from cli)
gulp.task('build', ['appScripts','vendorScripts' , 'css', 'templates'])
gulp.task('default', ['build', 'test']);
