var db=require('../dbconnection');


var Retrieve={
  getLogin:function(email, password, callback){
    return db.query("SELECT idUsers FROM Users WHERE email=\'"+email+"\' AND password=\'"+password+"\'", callback);
  },
  getMyProjects: function(id, callback){
    return db.query("SELECT * FROM Post WHERE idUsers = \'"+id+"\' ORDER BY PostDate ASC", callback);
  },
  getProjects: function(id, callback){
    return db.query("SELECT * FROM Post ORDER BY PostDate ASC", callback);
  },
};
module.exports = Retrieve;
