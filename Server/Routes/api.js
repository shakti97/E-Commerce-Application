const express = require('express');
const router = express.Router();
const logger=require('../../Logs/logConfig.js')
const SellerModel=require('../models/SellerModels.js');
const UserOperations=require('../Database/UserOperations.js')


//nik god code code
const productOperations=require('../Database/productOperations');
const sessionChecker=require('../middlewares/SessionHandling/sessionChecker');
const UserRoles=require('../Database/Schema/userRoleMapping');
const User=require('../Database/Schema/userSchema');
const Roles=require('../Database/Schema/roleSchema');

router.post('/fetchUser',(request, response)=>{

  var adminObject=request.body;
  // productOperations.addAdmin(adminObject,request,response);
  productOperations.checkAdmin(adminObject,request,response);
  console.log('request.body is',request.body);
  
});
router.get('/logout', (request,response)=>{

  console.log('inside the logut route..');
  request.session.destroy(err=>{

      console.log('session sestoryed and is accessible ',request.session);
      response.json({

          status: 200,
          responseStatus: 'logged out'
          });
  });

});
router.post('/verifySession',sessionChecker,(request,response)=>{
  console.log('inside the api/checksession');
      response.json({
  
          status:200,
          responseStatus: 'session found'
      });
  });
router.get('/getSellers',sessionChecker,(request,response)=>{

    console.log('getSellers api called...');
    productOperations.getSellers(request,response);
});

router.post('/deleteSeller',sessionChecker, (request,response)=>{
productOperations.deleteSeller(request,response);
})

/* GET api listing. */
router.post('/api', (req, res) => {
  logger.debug('api works');
  console.log('api works');
  console.log('req.header from api',req.headers);
  console.log(req.session.id);
  if(req.session.userid){
    console.log('user login')
    res.send({ isLogin :true})
  }
  else{
    console.log('user not login');
    res.send({isLogin : false});
  }
});

router.post('/doLogin',(req,res)=>{
  logger.debug('inside doLogin Routes');
  console.log('i m nside the doLogin route');
  console.log('req.session',req.session.id);
  console.log('req.body',req.body);
  console.log('req.headers',req.headers);
  userId=req.body.UserData.Email;
  password=req.body.UserData.Password;
  console.log('userID',userId);
  console.log('Password',password);
  const seller=new SellerModel(userId,password);
  UserOperations.fetchUser(seller,req,res);
});

router.post('/addProduct',(req,res)=>{
  logger.debug('trying to add product');
  console.log('i m adding the product');
  console.log('req.pdetails',req.body);
  let prDetails=req.body;
  UserOperations.AddProducts(prDetails,req,res);
});

router.get('/showProducts',(req,res)=>{  //session checker is to be added here
  logger.debug('trying to show products');
  console.log('Trying to show Products');
  console.log("reqbody",req.headers);
  UserOperations.GetProducts2(req,res);
});

router.delete('/deleteProducts/:pId?',(req,res)=>{
  logger.debug('trying to make the status of products deactivate');
  console.log('Trying to Update the Active Status');
  console.log('reqbody',req.headers);
  console.log(req.params);
  array= req.params.pId.split(',');
  console.log(array);
  UserOperations.DeleteProducts(array,res);

})
router.put('/updateProducts/:pId?',(req,res)=>{
  console.log('trying to update the products in api');
  console.log('reqbody',req.headers);
  pId=req.params.pId;
  productDetails=req.body;
  
  UserOperations.SellerUpdateProduct(pId,productDetails,res);
  
})
router.get('/GetProductSeller/:sId',(req,res)=>{
  console.log('inding product according to the seller');
  sId=req.params.sId;
  console.log('sid',sId);
  UserOperations.GetProductSeller(res,sId);
})
router.get('/GetSellerProduct/:sId',(req,res)=>{
  console.log('inding product according to the seller');
  sId=req.params.sId;
  console.log('sid',sId);
  UserOperations.GetSellerProduct(res,sId);
})
router.post('/addToCart',(req,res)=>{
  console.log('adding the product to the cart');
  pId=req.body.productId;
  sId=req.body.userId;
  console.log('pId '+pId+" sId "+sId);
  UserOperations.addToCart(pId,sId,res);
});
router.get('/showCartProduct/:sId',(req,res)=>{
  console.log('showing the product  in the cart');
  sId=req.params.sId;
  console.log('sId ',sId );
  UserOperations.showCartProduct(sId,res);
});
router.delete('/deleteCartProduct/:sId/:pId',(req,res)=>{
  console.log('showing the product  in the cart');
  sId=req.params.sId;
  pId=req.params.pId;
  console.log('sId ',sId + "pId ",pId );
  UserOperations.deleteCartProduct(sId,pId,res);
});
router.put('/updateCartProduct/:pId',(req,res)=>{
  console.log('updating the product  in the cart');
  pId=req.params.pId;
  sId=req.body.userId;
  todo=req.body.todo;
  console.log('pId ',pId+' userId ',sId );
  UserOperations.updateCartProduct(pId,sId,todo,res);
});

// router.get('/getOnlineUsers',sessionChecker, (request,response)=>{

//   console.log('inside the online users api...');
//   UserOperations.getOnlineUsers(request,response);

// });

router.get('/ProductCount',(req,res)=>{
  console.log('Product Count Routing');
  UserOperations.ProductCount(res);
});


module.exports = router;
