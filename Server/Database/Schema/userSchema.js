const mongoose=require('../common/connection');
const schema=mongoose.Schema;

var userSchema= new schema({

       'name': {
        'firstname': String,
        'lastname': String
    },

    'address': {
        'pincode': Number,
        'city': String,
        'state': String,
        'country': String,
        'locality': String,
        'landmark': String,
       
    },

    'isEmailVerified' : {type: Boolean, default: false},
    'gender': String,
    'mobile': [Number],
    "products": [],
    "cart":[],
    "wishlist": [],
    "order_history": [],
    'username': String,
    'password': String,
    'email': String,
    'status': {type: Boolean, default: true},
    
    //setup for  joins

    'role':String,
    'rights': [Number]

});

var userModel= mongoose.model('users', userSchema);
module.exports=userModel;

