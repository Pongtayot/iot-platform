"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sensor.init(
    {
      node_id: DataTypes.STRING,
      node_name: DataTypes.STRING,
      memory_size: DataTypes.STRING,
      sensor_id: DataTypes.STRING,
      sensor_name: DataTypes.STRING,
      sensor_value: DataTypes.STRING,
      status: DataTypes.STRING,
      last_active: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Sensors",
      underscored: true,
      freezeTableName: true,
      underscoredAll: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Sensor;
};
