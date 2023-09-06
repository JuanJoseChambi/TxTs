const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Publications', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        addedContent: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        

    }, {freezeTableName: true })
};
