const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "cart",
    {
      status: {
        type: DataTypes.ENUM("Por despachar", "Despachado", "Entregado"),
        allowNull: false,
        defaultValue: "Por despachar"
      },
      shipping: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      code: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      total: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    { timestamps: false }
  );
};
