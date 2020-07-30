module.exports = (sequelize, dataTypes) => {
    let alias = `Contact`;
    let cols = {
        id: {
            type: dataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        surname: {
            type: dataTypes.STRING       
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true

        },
        message: {
            type: dataTypes.TEXT
        }
    };
    let config = {
        tableName: `contact`,
        timestamps: true,
        createdAt: `created_at`,
        updatedAt: `updated_at`
    };
    const Contact = sequelize.define(alias, cols, config)

    

    return Contact;
}