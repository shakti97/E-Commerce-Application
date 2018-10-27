const sessionstore=require('sessionstore');
const config=require('../../Database/common/config.js');
var store=sessionstore.createSessionStore({

    type: 'mongodb',
        host: 'localhost',         // optional
        port: 27017,               // optional
        dbName: 'products',       // optional
        collectionName: 'sessions',// optional
        timeout: 10000,
        url: config.dbUrl
});



module.exports=store;