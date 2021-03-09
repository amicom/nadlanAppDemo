const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const rtlcss = require('gulp-rtlcss');
const hb = require('gulp-hb');
const browserSync = require('browser-sync').create();
const gulpWebpack  = require('webpack-stream');
const webpack = require('webpack');

sass.compiler = require('sass');

const cssPath = './src/assets/scss/';
const jsPath = './src/assets/js/';
const htmlPath = './src/*.html';
const partialPath = './src/assets/partials/**/*.hbs';
const dataPath = './src/assets/data/*.{js,json}';

function styles() {
  return src(cssPath + 'style.scss')
    .pipe(sass.sync({ includePaths: "node_modules", outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(rtlcss())
    .pipe(dest('./public/assets/css'));
}

function hbs() {
  return src(htmlPath)
    .pipe(hb()
      .partials(partialPath)
      // .helpers('./src/assets/helpers/*.js')
      .data(dataPath)
    )
    .pipe(dest('./public'));
}

function js(){
  return src(jsPath + 'main.js')
  .pipe(gulpWebpack({
    mode:'development',
    devtool: 'source-map',
    entry: {
      main: jsPath + 'main.js',
      compare: jsPath + 'compare.js',
    },
    output: {
      filename: '[name].js',
    },
  
  },webpack))
  .pipe(dest('./public/assets/js'));
}


exports.watch = function(){
  watch(partialPath, { ignoreInitial: false }, hbs);
  watch(cssPath, { ignoreInitial: false }, styles);
}

exports.serve = function(){
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
    watch(cssPath + "*.{css,scss}", watchStyles);
    watch(jsPath + "*.js", watchJS);
    watch(htmlPath, watchHbs);
    watch(partialPath, watchHbs);
    watch(dataPath, watchHbs);
}


function watchStyles(){
  return styles().pipe(browserSync.stream());
}

function watchHbs(){
  return hbs().pipe(browserSync.stream());
}

function watchJS(){
  return js().pipe(browserSync.stream());
}

exports.default = parallel(hbs, styles, js);

exports.hbs = hbs;
exports.styles = styles;
exports.js = js;