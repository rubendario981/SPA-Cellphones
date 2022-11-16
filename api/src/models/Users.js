const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "users",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      card_number: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("Admin", "User", "Suspendido", "Eliminado"),
        defaultValue: "User"
      },
    },
    { timestamps: false,
      hooks: {
        beforeCreate: async(users)=>{
          if(users.password){
            const salt = await bcrypt.genSaltSync(10)
            users.password = await bcrypt.hashSync(users.password, salt)
          }
        }
      }
    }
  );
};
