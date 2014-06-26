var express = require('express');
var router = express.Router();
var db = require('../models')

router.post('/create', function(req, res) {
  db.Project.create({ name: req.param('name'), title: req.param('title') }).success(function() {
    res.redirect('/')
  })
});

module.exports = router;
