var mongoose = require('./mngse');
var async = require('async');

async.series([
    open,
//    dropDatabase,
    requireModels,
    createUsers
], function(err) {
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

//function dropDatabase(callback) {
//    var db = mongoose.connection.db;
//    db.dropDatabase(callback);
//}

function requireModels(callback) {
    require('./models/user');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback) {

    var users_team = [
        {username: 'Serg', password: 'pass4serg'},
        {username: 'Ruslan', password: 'pass4rus'}
    ];

    async.each(users_team, function(userData, callback) {
        var team_user = new mongoose.models.TeamUser(userData);
        team_user.save(callback);
    }, callback);
}
