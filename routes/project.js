var express = require('express');
var router = express.Router();
var db = require('../models')

router.post('/create', function(req, res) {
  db.Project.create({ name: req.param('name'), title: req.param('title') }).success(function() {
    res.redirect('/')
  })
});

router.get('/:id', function(req, res) {
  db.Project.find({
      where: {id: req.param('id') },
      include: [ db.Palette ]
    }).success(function(project) {
    console.log(project)
    if (project)
      res.render('project', {
        project: project
      })
    else
      res.redirect('/')
  })
});

router.get('/:id/delete', function(req, res) {
  db.Project.find({ where: { id: req.param('id') } }).success(function(project) {
    if (project)
      project.destroy().success(function() {
        res.redirect('/')
      })
    else
        res.redirect('/')
  })
});

router.post('/:id/palettes', function(req, res) {
  db.Project.find({ where: { id: req.param('id') } }).success(function(project) {
    db.Palette.create({ name: req.param('name'), color: req.param('color') }).success(function(palette) {
      palette.setProject(project).success(function() {
        res.redirect('/projects/' + req.param('id'))
      })
    })
  })
});

router.get('/:project/palettes/:id/delete', function(req, res) {
  db.Palette.find({ where: { id: req.param('id') } }).success(function(palette) {
    if (palette)
      palette.destroy().success(function() {
        res.redirect('/projects/' + req.param('project'))
      })
    else
        res.redirect('/')
  })
});

module.exports = router;
