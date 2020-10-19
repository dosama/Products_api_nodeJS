const express =  require('express');
const firebaseService = require('../services/firebase-database-service');
const lookupsService = require('../services/lookups-service');
const collectionName='Promotions';
const router = express.Router();

// Getting all the promotions
router.get('/', (req, res) => {
    res.send( lookupsService.promotions);
   });

   // Getting a single promotion
router.get('/:id', (req, res) => {  
     firebaseService.getItem(collectionName
, req.params.id).then((result)=>{
    res.send(result);
}).catch(err=>console.error(err));
   });

   // Creating a promotion
router.post('/', (req, res) => {

  let obj ={
        code: req.body.name,
        discount: req.body.discount,
        active: req.body.active
    }
    firebaseService.upsertItem(collectionName
,obj).then((result)=>{
        res.send(result);
    }).catch(err=>console.error(err));  
   });

   // Updating a promotion
router.put('/:id', (req, res) => {
    let obj ={
        code: req.body.name,
        discount: req.body.discount,
        active: req.body.active
    }
    firebaseService.upsertItem(collectionName
,obj,req.params.id).then((result)=>{
        res.send(result);
    }).catch(err=>console.error(err));  
   });

   // Deleting a promotion
   router.delete('/:id', (req, res) => {
    firebaseService.deleteItem(collectionName,req.params.id).then((result)=>{
        res.send(result);
    }).catch(err=>console.error(err)); 
   });

   module.exports = router;