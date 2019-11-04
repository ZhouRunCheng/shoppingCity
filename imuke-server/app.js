var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goods = require('./routes/goods');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
* 确认cookie是否存在判断用户是否登录
* 通过request.originalUrl辨别请求的路由
* 路由拦截必须要在其他路由注入之前配置
* */
app.use((req, res, next) => {
  if(req.cookies.Id){
    next();
  }else{
    if(req.originalUrl === '/users/login' || req.originalUrl === '/users/loginOut' || req.originalUrl.indexOf('/goods/list') > -1){
      next()
    }else{
      res.json({
        status: '1',
        msg: '当前未登录',
        result: ''
      });
    }
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods', goods)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
1.  初始化passport
2.  将passport作为参数传到config里的passport.js中
 */
app.use(passport.initialize());
require('./config/passport')(passport);

module.exports = app;
