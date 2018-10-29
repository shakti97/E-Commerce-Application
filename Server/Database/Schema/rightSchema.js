const mongoose=require('../common/connection');

const schema=mongoose.Schema;
var rightSchema= new schema({

    _id: schema.Types.ObjectId,
 'rightid': Number,
 'routenames': [String],
 'rightstatus': {type: Boolean, default: true}
    
});

var rightModel=mongoose.model('rights',rightSchema);
module.exports=rightModel;