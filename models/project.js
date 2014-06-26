module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    associate: function(models) {
      Project.hasMany(models.Palette)
    }
  })

  return Project
}