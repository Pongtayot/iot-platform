"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ConnectedClient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ConnectedClient.init(
    {
      ip_address: DataTypes.STRING,
      node_name: DataTypes.STRING,
      last_active: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ConnectedClients",
      underscored: true,
      freezeTableName: true,
      underscoredAll: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return ConnectedClient;
};
