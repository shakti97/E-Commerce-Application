const mongoose=require('../common/connection');
const schema=mongoose.Schema;
var roleSchema= new schema({

    _id: schema.Types.ObjectId,
 'roleid': Number,
 'rolename': String,
 'rolestatus': {type: Boolean , default: true}
    
});

var roleModel=mongoose.model('roles',roleSchema);

module.exports=roleModel;