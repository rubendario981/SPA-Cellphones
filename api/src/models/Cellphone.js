const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "cellphone",
    {
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
      },
      screen: {
        type: DataTypes.STRING,
      },
      internal_storage: {
        type: DataTypes.STRING,
      },
      font_camera: {
        type: DataTypes.STRING,
      },
      rear_camera: {
        type: DataTypes.STRING,
      },
      cpu: {
        type: DataTypes.STRING,
      },
      ram: {
        type: DataTypes.STRING,
      },
      SO: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      battery: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
