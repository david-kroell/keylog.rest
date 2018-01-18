module.exports = (sequelize, DataTypes) => {
  return sequelize.define("log", {
    keystrokes: {
      type: DataTypes.STRING(50)
    }
  })
}