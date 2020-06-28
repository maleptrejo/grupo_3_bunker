module.exports= (sequelize, Types) => {
    const Users=sequelize.define (
        //alias
        'Users',

         //columns
        {
            id: {
                type: Types.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                // allowNull: false
            },
            email: {
                type: Types.STRING,
                allowNull: false,
                unique: true

            },
            password: {
                type: Types.STRING

            },
            avatar: {
                type: Types.STRING
            }
        },
    
        //config
        {tableName: "users",
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
        }

        )

        Users.associate=function(models) {
            Users.hasOne(models.Customers, {
                foreignKey: 'user_id',
                as: 'customers'
            }),
            Users.hasOne(models.Admins, {
                foreignKey: 'user_id',
                as: 'admins'
            })

        }

      
        
        return Users;
}