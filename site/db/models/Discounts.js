module.exports= (sequelize, Types) => {
    const Discounts=sequelize.define (
        //alias
        'Discounts',

         //columns
        {
            id: {
                type: Types.BIGINT(20).UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            level: {
                type: Types.DOUBLE(3,2).UNSIGNED,
                allowNull: false,
                unique: true

            }
        },
    
        //config
        {tableName: "Categories",
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
        }

        )

        //associate
        
        return Discounts;
}


