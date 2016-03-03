var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongodb_url = 'mongodb://140.112.170.32:27017/demo';

/* home made mongo db functions */
//
var dbfind = function ( collection, target, callback) {
	MongoClient.connect( mongodb_url, function (err, db) {
		assert.equal(err, null);
		console.log("Connected correctly to server.");
		cursor = db.collection(collection).find(target);
		var list = [];
		cursor.each( function (err, doc) {
		    assert.equal(err, null);
		    if (doc != null) {
		       	console.log(doc);
		        list.push(doc);
		    } else {
		    	console.log("db find success");
		        callback(list);
		        db.close();
		    }
	   	});
	});
}

var dbinsert = function ( collection, target, callback) {
	MongoClient.connect( mongodb_url, function (err, db) {
		assert.equal(err, null);
		console.log("Connected correctly to server.");
		db.collection(collection).insertOne( target,
		function (err, result) {
		    assert.equal(err, null);
		    console.log("db insert success");
		    callback(result);
		    db.close();
	   	});
	});
}

var dbdelete = function ( collection, target, callback) {
	MongoClient.connect( mongodb_url, function (err, db) {
		assert.equal(err, null);
		console.log("Connected correctly to server.");
		db.collection(collection).deleteMany( target,
		function (err, result) {
		    assert.equal(err, null);
		    console.log("db delete success");
		    callback(result);
		    db.close();
	   	});
	});
}

/* demo home test page */
router.get('/', function (req, res, next) {
  res.render('test_page');
});

/* Login */

/* POST CreateDevice */
router.post('/create_device', function (req, res, next) {
	console.log(req.body);
	dbinsert( 'device', req.body, function (data) {
		res.send("STATUS "+JSON.stringify(data));
	});
});

/* !!TESTING ONLY!! POST DeleteDevice */
router.post('/delete_device', function (req, res, next) {
	console.log(req.body);
	// delete data log
	dbdelete( 'data', {"WuID":req.body.WuID}, function (data) {
		//res.send("STATUS "+JSON.stringify(req.body));
		console.log(data);
	});
	// delete device info
	dbdelete( 'device', req.body, function (data) {
		res.send("STATUS "+JSON.stringify(data));
	});
});

/* GET GetAllDevice */
router.get('/get_all_device', function (req, res, next) {
	dbfind( 'device', {}, function (data) {
		res.setHeader('Content-Type', 'application/json');
		res.send(data);
	});
});

/* POST SendData */
router.post('/send_data', function (req, res, next) {
	console.log(req.body);
	dbinsert( 'data', 
		{
			"WuID":req.body.WuID,
			"Time":new Date(new Date(req.body.Time).toUTCString()),
			//.toISOString()
			"Data":req.body.Data
		}, function (data) {
		res.send("STATUS "+JSON.stringify(data));
	});
});

/* GET GetDeviceData */
router.get('/get_data', function (req, res, next) {
	console.log(req.query);
	dbfind( 'data', {"WuID":req.query.WuID}, function (data) {
		res.setHeader('Content-Type', 'application/json');
		res.send(data);
	});
});

/* GET GetDeviceData */
router.get('/get_data_by_time', function (req, res, next) {
	console.log(req.query);
	dbfind( 'data', 
		{
			"WuID":req.query.WuID,
			"Time":
			{
				$gte:new Date(new Date(req.query.TStart).toUTCString()),
				$lte:new Date(new Date(req.query.TEnd).toUTCString())
			}
		}, function (data) {
		res.setHeader('Content-Type', 'application/json');
		res.send(data);
	});
});


module.exports = router;
	