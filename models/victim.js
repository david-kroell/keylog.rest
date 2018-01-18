module.exports = (sequelize, DataTypes) => {
  return sequelize.define("victim", {
    ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING
    },
    region: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    macAdress: {
      type: DataTypes.STRING
    },
    os: {
      type: DataTypes.STRING
    }
  })
}
