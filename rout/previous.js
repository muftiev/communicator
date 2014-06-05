var Message = require('../models/message').Message;

exports.post = function(req, res, next) {
    var now = new Date(),
        perDays = req.body.perDays || 1,
        yesterday = (function(){this.setDate(this.getDate()-Number(perDays)); return this})
        .call(new Date);

    Message.find({created: {"$gte": yesterday, "$lt": now}}, function(err, data){
        if(err) next(err);
        res.send(data);
    });

};