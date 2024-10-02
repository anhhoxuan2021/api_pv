'use strict';
module.exports = app =>{
    const userController = require("../controllers/user.controller");
    var router = require("express").Router();

    
    router.get("/user/:id", userController.findUserById);
    //router.put("/user/:id", userController.updateUser);
    router.get("/users", userController.findAllUsers);
    //router.delete("/user/:id", userController.removeId);
    router.get("/user/email/:email", userController.findUserByEmail);



    app.use('/api', router);
  };