const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "rating",
    {
      title: {
        type: DataTypes.STRING,
				defaultValue: ''
      },
      comment: {
        type: DataTypes.STRING,
				defaultValue: ''
      },
      score: {
        type: DataTypes.INTEGER,
				defaultValue: 0
      }
    }
  );
};
