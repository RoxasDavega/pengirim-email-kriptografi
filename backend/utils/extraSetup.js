function applyExtraSetup(sequelize) {
    const { User, Mail } = sequelize.models;

    User.hasMany(Mail, {
        foreignKey: 'id_from',
        targetkey: 'id',
    });

    Mail.belongsTo(User, {
        foreignKey: 'id_from',
        targetkey: 'id',
        as: 'from',
    });
    
    User.hasMany(Mail, {
        foreignKey: 'id_to',
        targetkey: 'id',
    });

    Mail.belongsTo(User, {
        foreignKey: 'id_to',
        targetkey: 'id',
        as: 'to',
    });
    
}

module.exports = applyExtraSetup;