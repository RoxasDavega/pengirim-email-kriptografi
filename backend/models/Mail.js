function createModelMail(Sequelize, DataTypes) {
  const Mail = Sequelize.define(
    "Mail",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      subject: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      bodyMail: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      id_from: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: 'id_from',
      },
      id_to: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: 'id_to',
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ext: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "mails",
    }
  );
  return Mail;
}

module.exports = createModelMail;
