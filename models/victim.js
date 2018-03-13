module.exports = (sequelize, DataTypes) => {
  return sequelize.define("victim", {
    ip: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(30)
    },
    region: {
      type: DataTypes.STRING(30)
    },
    city: {
      type: DataTypes.STRING(30)
    },
    macAddress: {
      type: DataTypes.STRING(20)
    },
    useragent: {
      type: DataTypes.STRING(200)
    },
    uuid: {
      type: DataTypes.UUID
    },
    hostname: {
      type: DataTypes.STRING(40)
    }
  })
}
