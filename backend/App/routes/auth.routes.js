module.exports=(app)=>{
    const auth=require('../controllers/auth.controller.js');
    const verifySignup=require('../middleware/verifySignUp.js');

    const router=require('express').Router();


    router.post("/signUp",verifySignup.checkDuplicateEmail,auth.signUp);

    router.post("/signIn", auth.signIn);

    router.get("/users",auth.allUsers);

    app.use("/api/auth",router);
};