module.exports = function(sequelize, DataTypes) {
  var Color = sequelize.define('Color', {
    title: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    associate: function(models) {
      Color.belongsTo(models.Project)
    }
  })

  return Color
}