/**
 * Created by billyzou on 2017/9/18.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    userid: String,
    password: String,
    versionKey: false
});

exports.user = mongoose.model('users', userSchema);