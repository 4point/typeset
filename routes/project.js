var express = require('express');
var router = express.Router();
var db = require('../models')

router.post('/create', function(req, res) {
  db.Project.create({ name: req.param('name'), title: req.param('title') }).success(function() {
    res.redirect('/')
  })
});

router.get('/:id', function(req, res) {
  db.Project.find({ where: { id: req.param('id') } }).success(function(project) {
    res.render('project', {
      project: project
    })
  })
});

router.get('/:id/delete', function(req, res) {
  db.Project.find({ where: { id: req.param('id') } }).success(function(project) {
    project.destroy().success(function() {
      res.redirect('/')
    })
  })
});

module.exports = router;
