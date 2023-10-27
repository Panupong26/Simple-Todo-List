module.exports  = (sequelize,DataTypes) => {
    const model = sequelize.define('user',{
        username : {
            type : DataTypes.STRING(255)
        },
        password :{
            type : DataTypes.STRING(255)
        },
    },{
        tableName : 'user',
        timestamps : false,
        underscored : true
    });

    model.associate = models => {
        model.hasMany(models.list, {foreignKey : 'userId'});
    };
    
    return model;
}