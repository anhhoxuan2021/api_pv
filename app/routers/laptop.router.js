'use strict';
module.exports = app =>{
    const laptop = require("../controllers/laptop.controller");
    const types = require("../controllers/productType.controller");

    const ram = require("../controllers/ram.controller");
    const options = require("../controllers/option.controller");

    const productController = require("../controllers/product.controller");
    const accessoryController  = require("../controllers/accessory.controller");
    const giftController  = require("../controllers/gift.controller");

    const userController = require("../controllers/user.controller");

    var router = require("express").Router();

   //Laptop
    router.get("/laptops", laptop.getLaptops);
    router.get("/laptops/:limit/type/:type", laptop.getLimitLaptops);
    router.get("/laptops-paginator/:page/page-size/:pageSize", laptop.getLaptopUseLimitOffest);
    router.get("/laptop/:id", laptop.getLaptopByID);
    router.post("/create-laptop", laptop.createLaptop);
    router.post("/update-laptop", laptop.updateLaptop);
    // router.delete("/color/:id", color.removeId);  
    
    //Types and brands
    router.get("/types", types.getProductTypes);
    router.get("/brands", types.getBrands);
    router.post("/create-product-type", types.createProductType);
    // rams
    router.get("/rams", ram.getAllRam);
    // /option-types
    router.get("/option-types", options.getOptionType);
    
    ///accessory
    router.get("/products", productController.getAllProducts);
    router.get("/product/:id", productController.getProductByID);
    router.get("/products/:limit", productController.getLimitProducts);
    router.get("/products-paginator/:page/page-size/:pageSize", productController.ProductPagination);
    router.post("/create-product", productController.createProduct);
    router.post("/update-product", productController.updateProduct);
    
                        ///accessory
    router.get("/accessories", accessoryController.getAllAccessories);
    router.get("/accessory/:id", accessoryController.getAccessoryByID);
    router.get("/accessories/:limit", accessoryController.getLimitAccessories);
    router.get("/accessories-paginator/:page/page-size/:pageSize", accessoryController.AccessiesPagination);
    router.post("/create-accessory", accessoryController.createAccessory);
    router.post("/update-accessory", accessoryController.updateAccessory);
                        
                        ///Gift
    router.get("/gifts", giftController.getAllGifts);
    router.get("/gift/:id", giftController.getGiftID);
    router.get("/gifts/:limit", giftController.getLimitGifts);
    router.get("/gifts-paginator/:page/page-size/:pageSize", giftController.GiftsPagination);
    router.post("/create-gift", giftController.createGift);
    router.post("/update-gift", giftController.updateGift);
                       ///user
    router.get("/user/:id", userController.findUserById);
    router.get("/users", userController.findAllUsers);
    router.get("/user/email/:email", userController.findUserByEmail);

    app.use('/api', router);
  };