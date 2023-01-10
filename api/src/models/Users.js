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
				defaultValue: ''
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
				defaultValue: ''
      },
      country: {
        type: DataTypes.STRING,
				defaultValue: ''
      },
      city: {
        type: DataTypes.STRING,
				defaultValue: ''
      },
      address: {
        type: DataTypes.STRING,
				defaultValue: ''
      },
      card_number: {
        type: DataTypes.STRING,
				defaultValue: ''
      },
      status: {
        type: DataTypes.ENUM("Admin", "Inactivo", "User", "Suspendido", "Eliminado"),
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
