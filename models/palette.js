module.exports = function(sequelize, DataTypes) {
  var Palette = sequelize.define('Palette', {
    name: DataTypes.STRING,
    color: DataTypes.STRING
  }, {
    associate: function(models) {
      Palette
        .belongsTo(models.Project)
        .hasMany(models.Color)
    }
  })

  return Palette
}