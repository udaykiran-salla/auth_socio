const express=require('express');
const cors=require('cors');
const db=require('./App/model')

const app=express();

PORT=process.env.PORT || 8000;

var corsOptions={
    origin:"http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

//db connection

db.sequelize.sync()
.then(()=>{
    console.log("synced db");
})
.catch((err)=>{
    console.log("Failed to sync db:"+err.message);
});

//importing routes of user

require("./App/routes/auth.routes")(app);

app.get("/",(req,res)=>{
    res.json({message:'welcome'});
});

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
});

