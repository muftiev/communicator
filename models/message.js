var mongoose = require('../mngse'),
    Schema = mongoose.Schema;

var schema = new Schema({
    sender: {
        type: String,
        required: true
    },
    bodyText: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

exports.Message = mongoose.model('Message', schema);