var mysql      = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  port        : 3306
});
 
pool.getConnection( function(err, con) {
  if (err) throw err;
  else
  	 console.log('connected to my sql');
});

module.exports = pool;