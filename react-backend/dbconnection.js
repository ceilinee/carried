var mysql=require('mysql');

var connection=mysql.createPool({

    host:'localhost',
    user:'root',
    password:'ceilineeero',
    database:'sys',
    port:'3306',

});

module.exports=connection;
