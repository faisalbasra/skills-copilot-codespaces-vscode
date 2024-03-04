// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments');

var commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});
var Comment = mongoose.model('Comment', commentSchema);

// Get all comments
app.get('/comments', function (req, res) {
    Comment.find({}, function (err, comments) {
        if (err) throw err;
        res.send(comments);
    });
});

// Add a comment
app.post('/comments', function (req, res) {
    var newComment = new Comment(req.body);
    newComment.save(function (err, comment) {
        if (err) throw err;
        res.send(comment);
    });
});

// Start server
app.listen(3000, function () {
    console.log('Comments server listening on port 3000');
});