const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('cellphone', {
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cpu: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    ram: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    screen: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    front_camera: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    rear_camera: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    internal_storage: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  });
};
