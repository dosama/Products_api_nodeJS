const config = require('config');
const admin=require('firebase-admin');

const {Guid}  = require('js-guid')
const serviceAccount = require('../admin.json');


admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: config.get('firebase.database-url'),
authDomain: config.get('firebase.auth-domain')
});

const db = admin.database();
const firebaseDatabaseService = {};


firebaseDatabaseService.getItems =(collectionName)=>{

   let docRef = db.ref().child(collectionName).once('value');
    return new Promise((resolve,reject)=>{
        docRef.then((result) => {
        resolve( Object.entries(result.val()).map(([id, data]) => ({id,data})));
    }).catch(err=>reject(err));
    
  });

}

firebaseDatabaseService.getItem =(collectionName,id)=>{
    let docRef = db.ref().child(collectionName +'/'+ id).once('value');
    return new Promise((resolve,reject)=>{
        docRef.then((result) => {
        resolve(result.val());
    }).catch(err=>reject(err));
});
}
module.exports = firebaseDatabaseService;
    
   
     