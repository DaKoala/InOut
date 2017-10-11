var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = require('../models/user');
var User = mongoose.model("users");
var db = mongoose.connect('mongodb://localhost/nodedb');
var toCheckPassword;

db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});

db.connection.on("open", function () {
    console.log("数据库连接成功");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user) {
      res.render('homepage', {title: 'homepage', name: req.session.user.userid});
  } else {
      res.render('login', {});
  }
});

//GET login page
router.get('/login', function(req, res) {
  res.render('login', {});
});

//GET logout page
router.get('/logout', function(req, res){
  delete req.session.user;
  res.render('logout', {title: 'logout'});
});

//GET homepage
router.post('/index', function(req, res){
  var queryDoc = {
    userid: req.body.userid,
    password: req.body.password
  };
  User.findOne({userid: queryDoc.userid, password: queryDoc.password}, function(err, user){
    if(user) {
      console.log(queryDoc.userid + 'successfully login in ' + new Date());
      req.session.user = {userid: queryDoc.userid, password: queryDoc.password};
      res.render('homepage', {title: 'homepage', name: queryDoc.userid});
    } else {
        console.log(queryDoc.userid + 'login failed in ' + new Date());
        res.render('login', {});
    }
  });
});


//Register
router.get('/register', function(req, res) {
  res.render('register', {});
});

//Register finish
router.post('/registerFinish', function(req, res){
  var queryDoc = {
    userid: req.body.userid,
    password: req.body.password
  };
  var RegisterUser = new User ({
      userid: queryDoc.userid,
      password: queryDoc.password
  });
  RegisterUser.save(function(err) {});
  res.render('registerFinish', {});
});


//Register check
router.post('/registerCheck', function(req, res, next){
  var checkUser = req.body.userid;
  User.findOne({userid: checkUser}, function(err, user){
    if(user) {
      res.json(false);
    } else {
      res.json(true);
    }
  });
});

//Login check
router.post('/loginUserCheck', function(req, res, next){
    var checkUser = req.body.userid;
    User.findOne({userid: checkUser}, function(err, user){
        if(user) {
            res.json(true);
            toCheckPassword = true;
        } else {
            res.json(false);
            toCheckPassword = false;
        }
    });
});

router.post('/loginPasswordCheck', function(req, res, next){
    var checkUser = req.body.userid;
    var checkPassword = req.body.password;
    User.findOne({userid: checkUser, password: checkPassword}, function(err, user){
        if(user || toCheckPassword == false) {
            res.json(true);
        } else {
            res.json(false);
        }
    });
});




module.exports = router;
