module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    font: DataTypes.STRING,
    typo: DataTypes.STRING,
    typography: DataTypes.TEXT
  }, {
    associate: function(models) {
      Project.hasMany(models.Palette)
    },
    getterMethods: {
      typography: function(){
        return JSON.parse(this.getDataValue('typography'));
      }
    },
    setterMethods: {
      typography: function(v){
        return this.setDataValue('typography', JSON.stringify(v));
      }
    }
  })

  return Project
}