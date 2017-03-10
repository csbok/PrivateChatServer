var express = require('express');
var router = express.Router();

var models = require("../models");
var auth = require("../utils/auth");

router.get('/', auth.loginCheck, function(req, res) {
    /*
    models.Room.findAll({
        include: {model: models.User, attributes: ['Nickname']},
        where: {UserId: req.jwt.id}
    }).then(function(rooms) {
        console.log(JSON.stringify(rooms));
    });
    */
// select * from RoomEntries where RoomId in (
//    select id from Rooms r, RoomEntries re where r.id = re.RoomId and UserId = 6) and UserId <> 6;
/*
   models.RoomEntry.findAll({
       attributes:[[models.sequelize.literal('(SELECT COUNT(*) FROM RoomEntries WHERE RoomEntries.RoomId = Room.id)'), 'entryCount']],
       include: {model: models.Room, attributes: ['id']},
       where: {UserId: req.jwt.id}
   }).then(function(rooms) {
       console.log(JSON.stringify(rooms));
       var idList = [];
       var length = rooms.length;
       for (var i = 0; i < length; i++) {
           idList.push(rooms[i].Room.id);
       }

       return idList;
   }).then(function(idList) {
      return models.RoomEntry.findAll({
          include: {model: models.Room, attributes: ['id']},
          where: { RoomId: idList}
      })
   }).then(function(newRooms) {
       console.log('new Rooms ---- ');
       console.log(JSON.stringify(newRooms));
   })
   */
    models.RoomEntry.findAll({
        attributes:['RoomId'],
        where: {UserId: req.jwt.id}
    }).then(function(idList) {
        console.log(JSON.stringify(idList));
        var valueOnlyList = [];
        var length = idList.length;
        for (var i = 0; i < length; i++) {
            valueOnlyList.push(idList[i].RoomId);
        }
        return models.Room.findAll({
            include: {model: models.RoomEntry, attributes: ['UserId'], include: {model: models.User, attributes:['Nickname']}},
            where: {id: valueOnlyList}
        });
    }).then(function(rooms) {
        console.log(JSON.stringify(rooms));
        res.status(200).json(rooms);
    });
});

router.post('/', auth.loginCheck, function(req ,res) {
    models.Room.create().then(function(room) {
        room.addUser(req.body.friendId);
        room.addUser(req.jwt.id);

        res.status(200).json(room);
    });
});


module.exports = router;
