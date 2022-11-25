const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "cellphone",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
      },
      idImage: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      screen: {
        type: DataTypes.STRING,
      },
      internal_storage: {
        type: DataTypes.STRING,
      },
      ram: {
        type: DataTypes.STRING,
      },
      front_camera: {
        type: DataTypes.STRING,
      },
      rear_camera: {
        type: DataTypes.STRING,
      },
      cpu: {
        type: DataTypes.STRING,
      },
      battery: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      description: {
        type: DataTypes.STRING
      },
      stock: { // se cambio el atributo quantity que hacia referencia al inventario de unidades
        type: DataTypes.INTEGER 
      }      
    },
    { timestamps: false }
  );
};
