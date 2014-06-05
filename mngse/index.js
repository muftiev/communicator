var mongoose = require('mongoose');
var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/team-chat';

mongoose.connect(mongoUri, {"server": {"socketOptions": {"keepAlive": 1} } });
module.exports = mongoose;