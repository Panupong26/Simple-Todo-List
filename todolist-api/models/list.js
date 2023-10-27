module.exports  = (sequelize,DataTypes) => {
    const model = sequelize.define('list',{
        date : {
            type : DataTypes.STRING(255)
        },
        time :{
            type : DataTypes.STRING(255)
        },
        text : {
            type : DataTypes.STRING(255)
        }
    },{
        tableName : 'list',
        timestamps : false,
        underscored : true
    });

    model.associate = models => {
        model.belongsTo(models.user, {foreignKey : 'userId'});
    };
    
    return model;
}