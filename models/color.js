module.exports = function(sequelize, DataTypes) {
  var Color = sequelize.define('Color', {
    title: DataTypes.STRING
  }, {
    associate: function(models) {
      Color
        .belongsTo(models.Project)
        .belongsTo(models.Palette)
    }
  })

  return Color
}