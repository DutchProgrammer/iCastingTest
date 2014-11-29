var gulp      = require('gulp');
var concat    = require('gulp-concat');
var header    = require('gulp-header');
var shell     = require('gulp-shell');
var uglifyJS  = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');

var fs          = require('fs');
var glob        = require("glob");
var extend      = require('node.extend');

var options    = { 'sync': true };

var jsFiles         = [];
var cssFiles        = [];
var routeFiles      = {};

var getAllFiles = function (extension) {

  var safeTo = (extension == 'js' ? jsFiles : cssFiles);

  glob('./modules/*/*.'+extension, options).forEach(function (file, key) {

    if (file.indexOf('/default/') !== -1 ) {
      return;
    }
    if (file.indexOf('route.js') !== -1 ) {
      return;
    }

    console.info(file, extension+' file');
    if (file.indexOf('app.js') !== -1 || file.indexOf('/default-theme/') !== -1) {
      safeTo.unshift(file);
    } else {
      safeTo.push(file);
    }
  });

};

//Merge all route files to one array
var getAllRoutes = function () {

  glob('./modules/*/route.js', options).forEach(function (file, key) {

    //Skip default module
    if (file.indexOf('/default/') !== -1 ) {
      return;
    }

    var newRoute = JSON.parse(fs.readFileSync(file));

    var templatePath = file.replace('route.js', '').replace('./', '');

    newRoute[0].templateUrl = templatePath+newRoute[0].templateUrl;

    var saveRoute = {};

    saveRoute[newRoute[0].url] = {"controller" : newRoute[0].controller, "templateUrl" : newRoute[0].templateUrl};

    console.info(saveRoute, 'saveRoute');

    routeFiles = extend(routeFiles, saveRoute);
  });

};

getAllFiles('js');
//console.info(jsFiles, 'jsFiles');

getAllFiles('css');

//console.info(cssFiles, 'cssFiles');

getAllRoutes();
//console.info(routeFiles, 'routeFiles');


var config = {
   vendor: {
      js: [
         './bower_components/angular/angular.js',
         './bower_components/angular-route/angular-route.js',
         './bower_components/angular-touch/angular-touch.js',
         './bower_components/angular-animate/angular-animate.js',
         //'./bower_components/angular-mocks/angular-mocks.js',
         './bower_components/jquery/dist/jquery.js',
         './bower_components/bootstrap/dist/js/bootstrap.js',
         './bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.min.js',
      ],
      css: [
         './bower_components/bootstrap/dist/css/bootstrap.css',
         './font-awesome/css/font-awesome.css',
      ]
   }
}

gulp.task('build-npm',
   shell.task('npm install')
);

gulp.task('build-bower',
   shell.task('bower install')
);

gulp.task('build-main', ['build-main-css','build-main-js'],
  shell.task('cp modules/main/main.html index.html')
);


gulp.task('build-main-js', function () {
console.info(
       config.vendor.js
      .concat([
      ])
       .concat(jsFiles), 'JS files');

    return gulp.src(
       config.vendor.js
      .concat([
      ])
       .concat(jsFiles)
       )
      .pipe(concat('scripts.js'))
      .pipe(header('/** Created at ' + (new Date) + ' **/'))
      .pipe(header('var routeFiles = ' + JSON.stringify(routeFiles) + ';' + "\n"))
      .pipe(gulp.dest('js'))
      .pipe(concat('scripts.min.js'))
      .pipe(uglifyJS())
      .pipe(gulp.dest('js'))
      ;

});

gulp.task('build-main-css', function () {

console.info(
       config.vendor.css
       .concat(cssFiles), 'CSS files');

    return gulp.src(
       config.vendor.css
       .concat(cssFiles)
    )
        .pipe(concat('styles.css'))
        .pipe(header('/** Created at ' + (new Date) + ' **/'))
        .pipe(gulp.dest('css'))
        .pipe(concat('styles.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('css'))
    ;
})

