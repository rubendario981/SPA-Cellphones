const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "detailCart",
    {
      cantidad: {
        type: DataTypes.INTEGER,
				defaultValue: 0
      },
      valor_unitario: {
        type: DataTypes.INTEGER,
				defaultValue: 0
      },
    },
    { timestamps: false }
  );
};
