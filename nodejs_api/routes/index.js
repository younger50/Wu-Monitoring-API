var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var router = express.Router();

// db connection: current mondobe host at lab
var mongodb_url = 'mongodb://140.112.170.32:27017/wukong';

// test db: find all device of wukong
var device_list = [];
MongoClient.connect(mongodb_url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  list = db.collection('device').find();
  list.toArray(function(err, item) {
  	device_list.push(item); // add result to global array 
  });
  //db.close();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(device_list);
  res.render('index', { title: 'DB test -- device list', content: JSON.stringify(device_list)});
});

module.exports = router;
