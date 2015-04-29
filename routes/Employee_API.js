var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/empInsert', function(req, res, next) {
var db=require('../helper/DbConnection');
var query1='delete from Employee_Db.M_EmployeeDetails where RID=4';
var query2='select * from Employee_Db.M_EmployeeDetails';

var query3='call Employee_Db.Sp_EmpInsert('+db.escape('Ravi')+','+db.escape('12/03/2015')+','+db.escape('12/25/2013')+','+
	db.escape('9446154737')+','+db.escape('manu@abhilash.com')+','+db.escape('O+')+','+
	db.escape('Bangalore')+','+db.escape('Karnataka')+','+db.escape('SE')+');';

console.log(query3);
	db.query(query3, function(err, rows, fields) {
	  if (err) throw err;
	  else
	  	 console.log(rows[0][0].CheckExists);
	  	 console.log(rows);
	  	 res.send(rows[0][0]);
	});
});

module.exports = router;





