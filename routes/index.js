var express = require('express');
var router = express.Router();
var db = require('../models')

/* GET home page. */
router.get('/', function(req, res) {
  db.Project.findAll().success(function(projects) {
    res.render('index', {
      title: 'Projects',
      projects: projects
    })
  })
  //res.render('index', { title: 'Express' });
});

module.exports = router;
