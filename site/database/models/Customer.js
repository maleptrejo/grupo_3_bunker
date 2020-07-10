module.exports= (sequelize, Types) => {
    const Customer=sequelize.define (
        //alias
        `Customer`,

         //columns
        {
            id: {
                type: Types.BIGINT(20).UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Types.STRING(100),
                allowNull: false,

            },
            surname: {
                type: Types.STRING(100),
                allowNull: false,
            },
            adress: {
                type: Types.STRING(100),
                allowNull: false,
            },
            country: {
                type: Types.STRING(100),
                allowNull: false,

            },
            user_id: {
                type: Types.BIGINT(20).UNSIGNED,
                allowNull: false,
                references: {model: `Users`, key: `id`},
                onDelete:`CASCADE`
            },
         
            
        },
    
        //config
        {tableName: "customers",
        underscored: true,
        timestamps: true,
        createdAt: `created_at`,
        updatedAt: `update_at`
        }

        )

        Customer.associate=function(models) {
            Customer.belongsTo(models.Users, {
                foreignKey: `user_id`,
                as: `Users`
            })
        }
       
        return Customer;
}