

module.exports=(sequelize,Sequelize)=>{
    const User = sequelize.define('Users',{
        usreId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
          },
        email:{
            type:Sequelize.STRING
        },
        password:{
            type:Sequelize.STRING
        },
        userName:{
            type:Sequelize.STRING
        },
        MobileNumber:{
            type:Sequelize.BIGINT
        }
    });
    return User;
};