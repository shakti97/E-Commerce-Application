const userSchema = require('./Schema/userSchema.js');
const productSchemaFile = require('./Schema/ProductSchema');
const productSchema = productSchemaFile.ProductModel;
const ValidateProduct = productSchemaFile.validateProduct;
const categorySchemaFile = require('./Schema/CategorySchema');
const CategorySchema = categorySchemaFile.categoryModel;
const ValidateCategory = categorySchemaFile.validateCategory;
const brandSchemaFile = require('./Schema/BrandSchema');
const brandSchema = brandSchemaFile.brandModel;
const validateBrand = brandSchemaFile.validateBrand;
const passwordHash = require('password-hash');
const logger = require('../../Logs/logConfig.js');
var totalProducts = 0;

const UserOperations = {
  addUser(userObject) {
    userObject.password = passwordHash.generate(userObject.password);
    userSchema.create(userObject, (err, userDoc) => {
      if (err) {
        logger.error('Error occured', error);
        console.log('Error Occured');
      } else {
        logger.debug('Record added');
        console.log('Record Added To the DaTabase' + userDoc._id);
      }
    })
  },

  fetchUser(userObject, req, res) {
    console.log(' inside fetchUser call');
    userSchema.find({
      'username': userObject.userId
    }, (err, docs) => {
      if (err) {
        logger.error('Error', err);
        console.log('can"t fetch', err);
        res.send('Error on fetch');
      } else {
        if (docs && docs.length > 0) {
          console.log('here comes the record');
          let result = passwordHash.verify(userObject.password, docs[0].password);
          if (result) {
            req.session.userid = userObject.userId;
            req.session.save(err => {

              if (err) {
                console.log('error saving the session...');
                response.json({
                  error: err,
                  responseText: 'error saving the session'
                });
              } else {

                console.log('session saved successfully..');
              }
            });
            console.log('session.uerid', req.session.userid);
            console.log('request.session.id', req.session.id);
            console.log('seleer is authenticated');
            res.send({
              userId: docs[0]._id,
              isLogin: true
            });
          } else {
            console.log('invalid id ')
            res.send('<h2>Invalid Id Or Password</h2>')
          }
          // // response.send('Welcome User ' + userObject.userid);
          // request.session.userid = userObject.userid;
          // console.log('session.uerid',request.session.userid);
          // console.log('request.session.id',request.session.id);
          // response.render('dashboard',{
          //     uid : request.session.userid
          // })
        } else {
          res.send('Invalid UserId or Password');
        }
      }
    })
  },
  AddProducts(productDetails, req, res) {
    console.log('i m in AddProducts');
    logger.debug('AddProduct api');
    console.log('productObject', productDetails);
    const {
      CategoryError
    } = ValidateCategory({
      "CategoryName": productDetails.ProductCategory
    });
    const {
      BrandError
    } = validateBrand({
      "brandName": productDetails.ProductBrand
    });
    const {
      ProductError
    } = ValidateProduct({
      "name": productDetails.ProductName,
      "quantity": productDetails.ProductQuantity,
      "price": productDetails.ProductPrice,
      "image": productDetails.ProductImg,
      "description": productDetails.ProductInfo,
      "sellerId": productDetails.SellerId
    })
    if (CategoryError || BrandError || ProductError) {
      res.status(400).send('ErrorDetails' + CategoryError.details[0].message || BrandError.details[0].message || ProductError.details[0].message)
    } else {
      isProductAdded = this.ProductAdded(productDetails.ProductName, productDetails.ProductQuantity, productDetails.ProductPrice, productDetails.ProductImg, productDetails.ProductInfo, productDetails.SellerId).then((data) => {
        if (data) {
          isBrandAdded = this.BrandAdded(productDetails.ProductBrand, productDetails.SellerId);
          console.log('isBrandAdded promise', isBrandAdded);
          isBrandAdded.then((data) => {
            if (data) {
              isCategoryAdded = this.CategoryAdded(productDetails.ProductCategory, BrandId, productDetails.SellerId);
              isCategoryAdded.then((data) => {
                if (data) {
                  console.log('Product Added Succcessfully');
                  res.send({
                    isProductDetailsAdded: true
                  })
                }
              })
            }
          })
        }
      })
      // if(this.ProductAdded(productDetails.ProductName,productDetails.ProductQuantity,productDetails.ProductPrice,productDetails.ProductImg,productDetails.ProductInfo)){
      //   console.log('hey product added');
      //   isProductAdded = true;
      //   if(this.BrandAdded(productDetails.ProductBrand).bind(this)){
      //     isBrandAdded=true;
      //     if(this.CategoryAdded(productDetails.ProductCategory).bind(this)){
      //       isCategoryAdded=true;
      //       console.log('PRoduct Added SuccessFully');
      //       res.send({
      //         isProductDetailsAdded: true
      //       })
      //     }
      //   }
      // }

    }
  },
  ProductAdded(ProductName, ProductQuantity, ProductPrice, ProductImg, ProductInfo, SellerId) {
    console.log('product Adding');
    return new Promise((resolve, reject) => {
      productSchema.create({
        name: ProductName,
        quantity: ProductQuantity,
        price: ProductPrice,
        image: ProductImg,
        description: ProductInfo,
        sellerId: SellerId
      }, (error, Productdoc) => {
        if (error) {
          logger.error('error', error);
          console.log('error', error);
          reject(error);
        } else {
          console.log("id of product " + Productdoc._id);
          logger.debug('Product Added');
          console.log('Product Added');
          ProductId = Productdoc._id;
          resolve(true);
        }
      })
    })
  },
  BrandAdded(ProductBrand) {
    var Maindocument = null;
    console.log("I'm in BrandAdded");
    return new Promise((resolve, reject) => {
      brandSchema.findOne({
        brandName: ProductBrand
      }, (err, obj) => {
        if (err) {
          console.log('error', err);
        } else {
          console.log('brand', obj);
          Maindocument = obj;
          if (obj != null) {
            BrandId = obj._id
          }

          if (Maindocument) {
            console.log('found the element');
            brandSchema.update({
              brandName: ProductBrand
            }, {
              $push: {
                ProductId: ProductId
              }
            }, (error, docum) => {
              if (error) {
                console.log('Error', error);
                reject(error);
              } else {
                console.log('Brand Document Returned', docum);
                if (docum) {
                  console.log('productId pushed, got the same brand already');
                  resolve(true);
                }
              }
            });
          } else {
            console.log('not ofund the element');
            brands = new brandSchema({
              brandName: ProductBrand,
              ProductId: [ProductId]
            });
            brands.save(
              // brandSchema.create({
              //   brandName: productDetails.ProductBrand,
              //   ProductId : ProductId.push(Productdoc._id)
              // },
              (error, Branddoc) => {
                if (error) {
                  logger.error('error', error);
                  console.log('error', error);
                  reject(error);
                } else {
                  BrandId = Branddoc._id;
                  logger.debug('Brand Added');
                  console.log('Brand Added');
                  resolve(true);
                }
              })
          }

        }
      });
    });
  },
  CategoryAdded(ProductCategory, BrandId) {
    var Maindocument = null;
    return new Promise((resolve, reject) => {
      CategorySchema.findOne({
        CategoryName: ProductCategory
      }, (error, document) => {
        if (error) {
          console.log('error ', error);
        } else {
          Maindocument = document;
          console.log("MainDocument Category", document);
          if (Maindocument) {
            Maindocument.BrandId.forEach(BId => {
              if (BId == BrandId) {
                CategorySchema.update({
                  CategoryName: ProductCategory
                }, {
                  $push: {
                    ProductId: ProductId
                  }
                }, (error, docum) => {
                  if (error) {
                    console.log('Error', error);
                    reject(error);
                  } else {
                    console.log('Category Document Returned', docum);
                    if (docum) {
                      console.log('productId , got the same Category and Brand already');
                      resolve(true);
                    }
                  }

                });

              } else {
                console.log('same Catgory Added');
                CategorySchema.update({
                  CategoryName: ProductCategory
                }, {
                  $push: {
                    BrandId: BrandId,
                    ProductId: ProductId
                  }
                }, (error, docum) => {
                  if (error) {
                    console.log('Error', error);
                    reject(error);
                  } else {
                    console.log('Category Document Returned', docum);
                    if (docum) {
                      console.log('productId and BrandId pushed, got the same Category already');
                      resolve(true);
                    }
                  }

                });

              }
            })

          } else {
            console.log('Category not found');
            var Category = new CategorySchema({
              CategoryName: ProductCategory,
              BrandId: [],
              ProductId: []
            });
            console.log('new Category', BrandId);
            Category.BrandId.push(BrandId);
            Category.ProductId.push(ProductId);
            Category.save(
              // CategorySchema.create({
              //   CategoryName: productDetails.ProductCategory,
              //   BrandId : BrandId.push(Branddoc._id),
              //   ProductId : ProductId.push(Productdoc._id)
              // },
              (error) => {
                if (error) {
                  logger.error('error', error);
                  console.log('error', error);
                  reject(error);
                } else {
                  logger.debug('Category Added');
                  console.log('Category Added');
                  resolve(true);
                }
              })
          }
        }
      })
    })
  },
  GetProducts(req, res) {
    var productArray = [];
    CategorySchema.find({
      Active: true
    }, (error, categories) => {
      if (error) {
        console.log('error', error);
      } else {
        // console.log('document',categories);
        categories.forEach((Category) => {
          console.log('category', Category);
          let prId = Category.ProductId;
          console.log('prId', prId);
          Category.BrandId.forEach((ID) => {
            console.log('BrandId', ID);
            brandSchema.findById(ID, (err, brand) => {
              console.log('brandID yes', brand);
              if (brand.Active) {
                console.log('Active brand');
                brand.ProductId.forEach((id) => {
                  console.log('brand.ProductId', id);
                  prId.forEach(pid => {
                    console.log('pid', pid);
                    if (id == pid) {
                      productSchema.findById(id, (err, products) => {
                        if (products) {
                          detailProduct = {
                            CategoryName: Category.CategoryName,
                            BrandName: brand.brandName,
                            ProductName: products.name,
                            ProductPrice: products.price,
                            ProductImage: products.image,
                            ProductDescription: products.description
                          };
                          productArray.push(detailProduct);
                          console.log('productArray 1', productArray);
                          console.log('ProductDetails ' + products.name + ' BrandDetails ' + brand.brandName + ' CategoryDetails ' + Category.CategoryName);
                        }


                      })
                    }
                    // else{
                    //   console.log('this id is not of same Category and Brand');
                    // }
                  })

                })
              }
            })
          })
        })


      }
    })

  },
  GetProducts2(req, res) {
    var productArray = [];
    let totalProducts = 0;
    CategorySchema.find({
      Active: true
    }).exec((err, Categories) => {
      Categories.forEach((Category) => {
        totalProducts += (Category.ProductId).length;
      })
      Categories.forEach((Category) => {
        let prId = Category.ProductId;
        console.log('product Id Array from Category', prId);

        Category.BrandId.forEach((ID) => {
          this.GetBrandByID(req, res, ID, prId, Category, productArray, totalProducts);
        })
      })
    })
  },
  GetBrandByID(req, res, id, prId, Category, productArray, totalProducts) {
    return new Promise((resolve, reject) => {
      brandSchema.findById(id).exec((error, brand) => {
        if (brand.Active) {
          console.log('CategoryName', Category.CategoryName);
          console.log('brandName', brand.brandName);
          brand.ProductId.forEach((Id) => {
            console.log('Searching for Id', Id);
            prId.forEach((pId) => {
              console.log('Searching From', pId);
              if (Id == pId) {
                console.log('product Called', Id);
                this.GetProductById(req, res, Id, brand, Category, productArray, totalProducts);
              }
            })
          })
        }
      })
    })
  },
  GetProductById(req, res, id, brand, Category, productArray, totalProducts) {
    return new Promise((resolve, reject) => {
      productSchema.findById(id).exec((error, products) => {
        if (products) {
          detailProduct = {
            Date: products.Date,
            CategoryID: Category._id,
            CategoryName: Category.CategoryName,
            BrandID: brand._id,
            BrandName: brand.brandName,
            ProductID: products._id,
            ProductName: products.name,
            ProductQuantity: products.quantity,
            ProductPrice: products.price,
            ProductImage: products.image,
            ProductDescription: products.description
          };
          productArray.push(detailProduct);

          if (totalProducts == productArray.length) {
            console.log('Response Send');
            res.send({
              products: productArray
            });
          }
          console.log('detailsProduct', productArray);
        }

      })
    })
  },
  GetProductSeller(res, SellerId) {
    var productDetail = {};
    var productArray = [];
    totalProducts = 0;
    productSchema.find({
      sellerId: SellerId
    }, function (err, docs) {
      if (err) {
        res.status(400).send('error caught');
      } else {
        console.log("result", docs);
        console.log("docs.length", docs.length);
        docs.forEach(doc => {
          productDetail = {
            Date: doc.Date,
            ProductID: doc._id,
            ProductName: doc.name,
            ProductQuantity: doc.quantity,
            ProductPrice: doc.price,
            ProductImage: doc.image,
            ProductDescription: doc.description
          };
          console.log('productDetals ', productDetail);
          brandSchema.find({
            "ProductId": {
              "$in": [doc._id]
            }
          }, function (err, brandDocs) {
            if (err) {
              res.status(400).send('error caught');
            } else {
              console.log('brandDocs', brandDocs);
              productDetail.BrandName = brandDocs[0].brandName;
              console.log('productDetails after brand added', productDetail);
              CategorySchema.find({
                Active: true,
                "ProductId": {
                  "$in": [doc._id]
                }
              }, function (err, CategoryDocs) {
                if (err) {
                  res.status(400).send('error caught');
                } else {
                  console.log('CategoryDocs', CategoryDocs);
                  productDetail.CategoryName = CategoryDocs[0].CategoryName;
                  console.log('Category Details added', productDetail);
                  totalProducts += 1;
                  productArray.push(productDetail)
                  if (totalProducts == docs.length) {
                    console.log('send response');
                    res.status(200).send({
                      products: productArray
                    });
                  }
                }
              })
            }
          })
        })

      }
    })
  },
  GetSellerProduct(res, SellerId) {
    var productDetail = {};
    var productArray = [];
    productSchema.find({
      sellerId: SellerId
    }, function (err, docs) {
      if (err) {
        res.status(400).send('error caught');
      } else {
        console.log("result", docs);
        console.log("docs.length", docs.length);
        productArrayLength = docs.length;
        docs.forEach(doc => {
          productDetail = {
            Date: doc.Date,
            ProductID: doc._id,
            ProductName: doc.name,
            ProductQuantity: doc.quantity,
            ProductPrice: doc.price,
            ProductImage: doc.image,
            ProductDescription: doc.description
          };
          console.log('productDetals ', productDetail);
          UserOperations.GetSellerBrand(productDetail, doc._id, productArray, productArrayLength, res).then(res => {
            console.log("brand ", res)
          });

        })
      }
    })
  },

  async GetSellerBrand(productDetail, docs, productArray, productArrayLength, res) {
    await brandSchema.find({
      "ProductId": {
        "$in": [docs]
      }
    }, function (err, brandDocs) {
      if (err) {
        res.status(400).send('error caught');
      } else {
        console.log('brandDocs', brandDocs);
        productDetail.BrandName = brandDocs[0].brandName;
        console.log('productDetails after brand added', productDetail);
        UserOperations.GetSellerCategory(productDetail, docs, productArray, productArrayLength, res).then(res => {
          console.log("category ", res)
        });
      }
    })
  },
  async GetSellerCategory(productDetail, docs, productArray, productArrayLength, res) {
    await CategorySchema.find({
      Active: true,
      "ProductId": {
        "$in": [docs._id]
      }
    }, function (err, CategoryDocs) {
      if (err) {
        res.status(400).send('error caught');
      } else {
        console.log('CategoryDocs', CategoryDocs);
        productDetail.CategoryName = CategoryDocs[0].CategoryName;
        console.log('Category Details added', productDetail);
        totalProducts += 1;
        console.log('totalProducts ' + totalProducts);
        productArray.push(productDetail)
        console.log('productArray ', productArray);

        if (totalProducts == productArrayLength) {
          console.log('send response');
          res.status(200).send({
            products: productArray
          });
        }
      }
    })
  },

  DeleteProducts(pId, res) {
    console.log('Delete Products ' + pId);
    pId.forEach(pid => {
      productSchema.findByIdAndRemove(pid)
        .exec((error) => {
          if (error) {
            res.status(200).send({
              isProductDeleted: false
            });
          } else {
            console.log('Finding the brand from which the element should me remove');
            let PromiseBrandDelete = this.DeleteProductFromBrand(pid);
            console.log('PromiseBrandDelete', PromiseBrandDelete);
            PromiseBrandDelete.then((resolve) => {
                console.log('Finding the category from which the element should me remove');
                let PromiseCategoryDelete = this.DeleteProductFromCategory(pid);
                console.log('PromiseCategoryDelete', PromiseCategoryDelete);
                PromiseCategoryDelete.then((resolve) => {
                    res.status(200).send({
                      isProductDeleted: true
                    });
                  }, reject => {
                    console.log('Promise rejcted in category');
                  })
                  .catch(error1 => {
                    console.log('what the fuck, the error in category', error1);
                  })

              }, reject => {
                console.log('promise rejected in brand');
              })
              .catch(error2 => {
                console.log('what the fuck, the error in brand', error2);
              })





          }
        })
    })

  },
  DeleteProductFromCategory(pid) {
    let cid;
    return new Promise((resolve, reject) => {
      CategorySchema.find({
        Active: true
      }).exec((error, Categories) => {
        Categories.forEach(Category => {
          (Category.ProductId).forEach(id => {
            if (id == pid) {
              cid = Category._id;
              console.log('cid ' + cid);
              CategorySchema.findByIdAndUpdate(
                cid, {
                  $pull: {
                    ProductId: pid
                  }
                }, {
                  safe: true,
                  upsert: true
                }, (error) => {
                  if (error) {
                    console.log('error in Catgory function')
                    reject(error);
                  } else {
                    console.log('Successfully resolve');
                    resolve(true);
                  }
                })
            }
          })
        })

      });
    })
  },
  DeleteProductFromBrand(pid) {
    return new Promise((resolve, reject) => {
      brandSchema.find({
        Active: true
      }).exec((error, brands) => {
        brands.forEach(brand => {
          (brand.ProductId).forEach(id => {
            if (id == pid) {
              bid = brand._id;
              console.log('bid ' + bid);
              brandSchema.findByIdAndUpdate(
                bid, {
                  $pull: {
                    ProductId: pid
                  }
                }, {
                  safe: true,
                  upsert: true
                }, (error) => {
                  if (error) {
                    console.log('error in Brand Function')
                    reject(error);
                  } else {
                    console.log('succcessfully resolve');
                    resolve(true);
                  }
                })
            }
          })
        })

      });
    })
  },
  SellerUpdateProduct(pId, productDetails, res) {
    console.log('Hey i m in the UserOperation in the UpdateProduct');
    productSchema.findByIdAndUpdate(pId, {
      name: productDetails.ProductName,
      quantity: productDetails.ProductQuantity,
      price: productDetails.ProductPrice,
      image: productDetails.ProductImg,
      description: productDetails.ProductInfo
    }, (error) => {
      if (error) {
        logger.error('error', error);
        console.log('error', error);
        res.send(false);
      } else {
        logger.debug('Product Added');
        console.log('Product Updates');
        res.send(true);
      }
    })
  },
  UpdateProduct(pId, todo, res) {
    if (todo > 0) {
      console.log('decrease the qunatity of the prpoduct in the backend by 1');
      return new Promise((resolve, reject) => {
        productSchema.findByIdAndUpdate(pId, {
          $inc: {
            quantity: -1
          }
        }, (error) => {
          if (error) {
            // console.log('error', error);
            // res.status(500).send({  
            //   ErrorMsg: error
            // });
            reject(error);
          } else {
            console.log("Product Quantity Updated -1");
            resolve(true);
          }
        })
      })
    } else {
      console.log('increase the qunatity of the prpoduct in the backend by 1');
      return new Promise((resolve, reject) => {
        productSchema.findByIdAndUpdate(pId, {
          $inc: {
            quantity: 1
          }
        }, (error) => {
          if (error) {
            console.log('error', error);
            // res.status(500).send({
            //   ErrorMsg: error
            // });
            reject(error);
          } else {
            console.log("Product Quantity Updated +1 in backend");
            resolve(true);
          }
        })
      })
    }
  },
  addToCart(productId, userId, res) {
    console.log("I'm in add to cart");
    userSchema.findById(userId, (err, userDetails) => {
      if (err) {
        console.log('error', err);
        res.status(500).send({
          error: 'got Error in finding the userId'
        })
      } else {
        console.log('userDetails', userDetails);
        if (userDetails) {
          console.log('found the user');
          this.UpdateProduct(productId, 1, res);
          var pObj = {
            ProductId: productId,
            Quantity: 1
          }
          userSchema.update({
            _id: userId
          }, {
            $push: {
              cart: pObj
            }
          }, (error, docum) => {
            if (error) {
              console.log('Error', error);
              res.status(500).send({
                "ErrorMsg": error
              })
            } else {
              console.log('UserData Document Returned', docum);
              if (docum) {
                console.log("docum", docum);
                console.log('productId pushed, have some value in cart previously');
                res.status(200).send({
                  isProductAdded: true
                });
              }
            }
          });
        } else {
          console.log('not found the user');
          res.status(500).send({
            msg: "Not found the User"
          })
        }

      }
    });
  },
  showCartProduct(userId, res) {
    var productArray = [];
    console.log('showing the cart Product of the User');
    userSchema.findById(
      userId
    ).exec((error, userDetails) => {
      if (error) {
        console.log('error', error);
        res.status(500).send({
          "ErrorMsg": error
        });
      } else {
        console.log('userDetails ', userDetails);
        ProductIdArray = userDetails.cart;
        console.log('userDetails.cart', userDetails.cart);
        if (userDetails.cart) {
          console.log('userDetails does have some content');
          LengthOfIdArray = ProductIdArray.length;
          ProductIdArray.forEach(product => {
            console.log("product ", product)
            qty = product.Quantity;
            productSchema.findById(product.ProductId).exec((error, products) => {
              if (error) {
                console.log('error', error);
                res.status(500).send({
                  "ErrorMsg": error
                });
              } else {
                productDetail = {
                  ProductID: products._id,
                  ProductName: products.name,
                  ProductPrice: products.price,
                  ProductQuantity: qty
                };
                productArray.push(productDetail);
                console.log("productArray ", productArray);
                if (productArray.length === LengthOfIdArray) {
                  console.log('send response');
                  res.status(200).send({
                    products: productArray
                  });

                }
              }
            })
            console.log('productArray Length ', productArray.length);
            console.log('LengthOfArray ', LengthOfIdArray);

          })
        } else {
          res.status(200).send("No Product");
        }
      }
    })
  },
  deleteCartProduct(userId, pId, res) {
    console.log('i m in the delete cart product');
    userSchema.findById(userId).exec((error, userDetails) => {
      if (error) {
        console.log('error', error);
        res.status(500).send({
          "ErrorMsg": error
        });
      } else {
        console.log('found the user ', userDetails);
        userSchema.update({
          _id: userId
        }, {
          $pull: {
            "cart": {
              "ProductId": pId
            }
          }
        }, (error) => {
          if (error) {
            console.log('error', error);
            res.status(500).send({
              "ErrorMsg": error
            });
          } else {
            res.status(200).send({
              isProductDeleted: true
            });
          }
        })
      }
    })
  },
  updateCartProduct(productId, userId, todo, res) {
    if (todo > 0) {
      console.log('todo to change in the add to cart qunatity ', todo);
      this.UpdateProduct(productId, todo, res);

      userSchema.findByIdAndUpdate(userId, {
        $inc: {
          "cart.$[elem].Quantity": 1
        }
      }, {
        "arrayFilters": [{
          "elem.ProductId": productId
        }]
      }, (error) => {
        if (error) {
          console.log('error', error);
          res.status(500).send({
            ErrorMsg: error
          });
          reject(error);
        } else {
          console.log("Product Quantity Updated for addTo Cart +1");
          res.status(200).send(true);
        }
      })
    } else {
      this.UpdateProduct(productId, todo, res);

      userSchema.findByIdAndUpdate(userId, {
        $inc: {
          "cart.$[elem].Quantity": -1
        }
      }, {
        "arrayFilters": [{
          "elem.ProductId": productId
        }]
      }, (error) => {
        if (error) {
          console.log('error', error);
          res.status(500).send({
            ErrorMsg: error
          });
          reject(error);
        } else {
          console.log("Product Quantity Updated for Add to Cart -1");
          res.status(200).send(true);
        }
      })
    }
  },
   ProductCount(res){
    async function f(){
      count=await productSchema.find().count();
      return count;
    }
    var count=f();
    count.then(data=>{console.log(data);res.send({"count":count})});
  }
}

module.exports = UserOperations;
