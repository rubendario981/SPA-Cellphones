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
				defaultValue: ''
      },
      image: {
        type: DataTypes.TEXT,
				defaultValue: ''
      },
      idImage: {
        type: DataTypes.STRING,
				defaultValue: ''
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
				defaultValue: 0
      },
      screen: {
        type: DataTypes.STRING,
				defaultValue: ''
      },
      internal_storage: {
        type: DataTypes.STRING,
				defaultValue: ''
      },
      ram: {
        type: DataTypes.STRING,
				defaultValue: ''
      },
      front_camera: {
        type: DataTypes.STRING,
				defaultValue: ''
      },
      rear_camera: {
        type: DataTypes.STRING,
				defaultValue: ''
      },
      cpu: {
        type: DataTypes.STRING,
				defaultValue: ''
      },
      battery: {
        type: DataTypes.STRING,
        allowNull: false,
				defaultValue: ''
      },
      color: {
        type: DataTypes.ARRAY(DataTypes.STRING),
				defaultValue: []
      },
      description: {
        type: DataTypes.STRING,
				defaultValue: ''
      },
      stock: { // se cambio el atributo quantity que hacia referencia al inventario de unidades
        type: DataTypes.INTEGER,
				defaultValue: 0
      }      
    },
    { timestamps: false }
  );
};
