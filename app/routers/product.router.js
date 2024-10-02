'use strict';
module.exports = app =>{
    const productController = require("../controllers/product.controller");
    const accessoryController  = require("../controllers/accessory.controller");
    const giftController  = require("../controllers/gift.controller");

    var router = require("express").Router();

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
   
    app.use('/api', router);
  };
  