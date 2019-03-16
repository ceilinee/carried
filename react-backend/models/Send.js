var db=require('../dbconnection');


var Send={
  addName:function(body, callback){
    return db.query("INSERT INTO Users (email, password) VALUES (\'" + body.email + "\', \'" + body.password + "\')", callback);
  },
  addProject:function(body, callback){
    return db.query("INSERT INTO Post (Address, PostDate, PostTime, idUsers, Location, Seats, Contact) VALUES (\'" + body.address + "\', \'" + body.date + "\', \'" + body.time + "\', \'" + body.idUsers + "\', \'" + body.location + "\', \'" + body.seats + "\', \'" + body.contact + "\')", callback);
  },
  updateProject:function(body, callback){
    return db.query("UPDATE Post SET Address = \'" + body.address + "\', PostDate = \'" + body.date + "\', PostTime = \'" + body.time + "\', Seats = \'" + body.seats + "\', Contact = \'" + body.contact + "\' WHERE idPost = \'" + body.idPost + "\'", callback);
  },
  changeCheck: function (body, callback) {
    return db.query(`UPDATE Project SET checked = (CASE WHEN checked = '1' THEN 0 ELSE 1 END) WHERE Name = "${body.name}" AND idUsers = "${body.idUsers}"`, callback);
  },
  deleteTask:function(query, callback){
    return db.query("DELETE FROM Project WHERE (Name = \'"+query.name+"\' AND idUsers = \'"+query.idUsers+"\')", callback);
  },
  deletePost:function(query, callback){
    return db.query("DELETE FROM Post WHERE (idPost = \'"+query.idPost+"\')", callback);
  },
};
module.exports = Send;
