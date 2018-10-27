const mongoose=require('../common/connection');

const schema=mongoose.Schema;
var userRoleMappingSchema= new schema({

    'username': String,
    'roleid':Number
    
});

var userRoleMappingModel=mongoose.model('userroles',userRoleMappingSchema);
module.exports=userRoleMappingModel;