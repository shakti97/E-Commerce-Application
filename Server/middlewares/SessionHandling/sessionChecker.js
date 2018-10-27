let sessionChecker= ( request , response , next )=> {

    console.log('request inside the sessionChecker...');
    console.log(request.method);
    if(request.session && request.session.username){
       if(request.method=='POST'){
           console.log('request.body inside the sessioonChecjker is',request.body);
           if(request.body.sessionId==request.sessionID){
               console.log('inside the if of post sessionChecker..');
               next();
           }
           else{
               console.log('inside the else of post sessionChecker..');
               response.json({
                   status: 403,
                responseText: 'session not found'
                });
           }

       }

     else {
         console.log(request.method);
         console.log('sessionId inside the sessionchecker get is',request.param('sessionId') );
        if(request.param('sessionId')==request.sessionID){
            console.log('inside the if of sessionChecker..');
            next();
        }
        else{
            response.json({
                status: 403,
             responseText: 'session not found'
             });
        }
        
       }

    
    }


};

module.exports=sessionChecker;