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
      include: [ db.Palette, {
          model: db.Color,
          include: [db.Palette]
      }],
    }).success(function(project) {

    if (project)
      res.render('project', {
        title: project.title,
        font: project.font,
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

router.post('/:id/colors', function(req, res) {
  db.Project.find({ where: { id: req.param('id') }, include: [db.Palette] }).success(function(project) {
    db.Color.create({ title: req.param('title'), PaletteId: project.palettes[req.param('color') - 1].id }).success(function(color) {
      color.setProject(project).success(function() {
        res.redirect('/projects/' + req.param('id'))
      })
    })
  })
});

router.get('/:project/colors/:id/delete', function(req, res) {
  db.Color.find({ where: { id: req.param('id') } }).success(function(color) {
    if (color)
      color.destroy().success(function() {
        res.redirect('/projects/' + req.param('project'))
      })
    else
        res.redirect('/')
  })
});

router.post('/:id/typo', function(req, res) {
  db.Project.find({ where: { id: req.param('id') } }).success(function(project) {
    project.typo = req.param('typo');
    project.save(['typo']).success(function() {
        res.json({ url: '/projects/' + req.param('id') })
    })
  })
});

router.post('/:id/font', function(req, res) {
  db.Project.find({ where: { id: req.param('id') } }).success(function(project) {
    project.font = req.param('font');
    project.save(['font']).success(function() {
        res.json({ url: '/projects/' + req.param('id') })
    })
  })
});

router.post('/:id/typography', function(req, res) {
  db.Project.find({ where: { id: req.param('id') } }).success(function(project) {
    if (req.param('typography'))
      project.typography = req.param('typography');
    else
      project.typography = null;
    project.save(['typography']).success(function() {
        res.json({ url: '/projects/' + req.param('id') })
    })
  })
});


module.exports = router;
