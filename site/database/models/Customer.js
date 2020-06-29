module.exports= (sequelize, Types) => {
    const Customer=sequelize.define (
        //alias
        'Customers',

         //columns
        {
            id: {
                type: Types.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Types.STRING,
                allowNull: false,

            },
            surname: {
                type: Types.STRING,
                allowNull: false,
            },
            adress: {
                type: Types.STRING,
                allowNull: false,
            },
            country: {
                type: Types.STRING,
                allowNull: false,

            },
            user_id: {
                type: Types.BIGINT,
                allowNull: false,
                references: {model: 'Users', key: 'id'},
                //  onDelete:'CASCADE'
            },
         
            
        },
    
        //config
        {tableName: "customers",
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
        }

        )

        Customer.associate=function(models) {
            Customer.belongsTo(models.Users, {
                foreignKey: 'user_id',
                as: 'users'
            })
        }
       
        return Customer;
}