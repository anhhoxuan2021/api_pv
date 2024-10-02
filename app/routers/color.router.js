'use strict';
module.exports = app =>{
    // const color = require("../controllers/color.controller");
    // const cpu = require("../controllers/cpu.controller");
    // const cpuGenerate = require("../controllers/cpuGenerate.controller");
    // const laptopDemand = require("../controllers/laptopDemand.controller");
     
    // const serieslaptop = require("../controllers/serieslaptop.controller");
    // const size = require("../controllers/size.controller");
    
    //const userController = require("../controllers/user.controller");

    const ram = require("../controllers/ram.controller");
    const options = require("../controllers/option.controller");
    var router = require("express").Router();

    // router.get("/colors", color.getAll);
    // router.get("/color/:id", color.findById);
    // router.post("/color", color.create);
    // router.put("/color/:id", color.updateById);
    // router.delete("/color/:id", color.removeId);    
    
    ///CPU  
    // router.get("/cpus", cpu.getAll);
    // router.get("/cpu/:id", cpu.findById);
    // router.post("/cpu", cpu.create);
    // router.put("/cpu/:id", cpu.updateById);
    // router.delete("/cpu/:id", cpu.removeId);

    // ///cpuGenerate
    // router.get("/cpuGenerates", cpuGenerate.getAll);
    // router.get("/cpuGenerate/:id", cpuGenerate.findById);
    // router.post("/cpuGenerate", cpuGenerate.create);
    // router.put("/cpuGenerate/:id", cpuGenerate.updateById);
    // router.delete("/cpuGenerate/:id", cpuGenerate.removeId);

    // ///Demand
    // router.get("/laptopDemands", laptopDemand.getAll);
    // router.get("/laptopDemand/:id", laptopDemand.findById);
    // router.post("/laptopDemand", laptopDemand.create);
    // router.put("/laptopDemand/:id", laptopDemand.updateById);
    // router.delete("/laptopDemand/:id", laptopDemand.removeId);
 
    ///Ram 
    router.get("/rams", ram.getAllRam);
    // router.get("/ram/:id", ram.findById);
    // router.post("/ram", ram.create);
    // router.put("/ram/:id", ram.updateById);
    // router.delete("/ram/:id", ram.removeId);

    // /// serieslaptop
    // router.get("/serieslaptops", serieslaptop.getAll);
    // router.get("/serieslaptop/:id", serieslaptop.findById);
    // router.post("/serieslaptop", serieslaptop.create);
    // router.put("/serieslaptop/:id", serieslaptop.updateById);
    // router.delete("/serieslaptop/:id", serieslaptop.removeId);

    // /// Size
    // router.get("/sizes", size.getAll);
    // router.get("/size/:id", size.findById);
    // router.post("/size", size.create);
    // router.put("/size/:id", size.updateById);
    // router.delete("/size/:id", size.removeId);

    /// multipleType
    router.get("/option-types", options.getOptionType);



    app.use('/api', router);
  };