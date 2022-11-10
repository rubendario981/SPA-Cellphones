const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "bill",
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      partial: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      taxes: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      idUser: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      idCellphone: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
