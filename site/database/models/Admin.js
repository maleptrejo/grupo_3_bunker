module.exports= (sequelize, Types) => {
    const Admin=sequelize.define (
        //alias
        `Admin`,

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
            sname: {
                type: Types.STRING(100),
                allowNull: false,
            },

           
            user_id: {
                type: Types.BIGINT(20).UNSIGNED,
                allowNull: false,
                references: {model: `Users`, key: `id`},
            },
         
            
        },
    
        //config
        {tableName: "admins",
        underscored: true,
        timestamps: true,
        createdAt: `created_at`,
        updatedAt: `updated_at`
        }

        )

        Admin.associate=function(models) {
            Admin.belongsTo(models.Users, {
                foreignKey: `user_id`,
                as: `Users`
            })
        }
       
        return Admin;
}