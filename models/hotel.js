module.exports = (sequelize, DataTypes) => {
    const Hotel = sequelize.define('Hotel', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tipe_kamar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        kapasitas_tamu: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lantai: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fasilitas: {    
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'hotel',
        freezeTableName: true,
        timestamps: true,
    
    });
    return Hotel;
};