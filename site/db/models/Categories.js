module.exports= (sequelize, Types) => {
    const Categories=sequelize.define (
        //alias
        'Categories',

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
        
        return Categories;
}