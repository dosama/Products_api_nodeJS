const config = require('config');
const admin=require('firebase-admin');
const {Guid}  = require('js-guid')
const serviceAccount = require('../admin.json');
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: config.get('firebase.database-url'),
authDomain: config.get('firebase.auth-domain')
});
const db = admin.firestore();
const firebaseService = {};


firebaseService.getItems =(collectionName, query=null)=>{
    let result = [];
    let  docRef =  query == null ?db.collection(collectionName).get():
    db.collection(collectionName).where(query.key, query.operator, query.value).get();
    return new Promise((resolve,reject)=>{
        docRef.then((docs) => {
        docs.forEach((doc) => {
            result.push({"id":doc.id,"data":doc.data()});
        });
        resolve(result);
    }).catch(err=>reject(err));
});
}

firebaseService.getItem =(collectionName,id)=>{
    let result = {};
    let docRef =  db.collection(collectionName).doc(id);
    return new Promise((resolve,reject)=>{
        docRef.get().then((doc) => {
        result= {"id":doc.id,"data":doc.data()};
        resolve(result);
    }).catch(err=>reject(err));
});
}

firebaseService.upsertItem =(collectionName,obj,id=null)=>{
  
    const docId = id == null?Guid.newGuid():id;
    let docRef =  db.collection(collectionName).doc(`${docId}`);
    return new Promise((resolve,reject)=>{
        docRef.set(obj).then(()=> {
            resolve(true);
        }).catch((error)=> {
            reject(error);
        });
    });
}

firebaseService.deleteItem =(collectionName,id)=>{
    let docRef =  db.collection(collectionName).doc(id);
    return new Promise((resolve,reject)=>{
        docRef.delete().then(()=> {
            resolve(true);
        }).catch((error)=> {
            reject(error);
        });
    });
}

module.exports = firebaseService;
    
   
     