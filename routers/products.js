const express =  require('express');
const firebaseService = require('../services/firebase-service');
const collectionName='Products';
const router = express.Router();

// Getting all the products
router.get('/', (req, res) => {
    firebaseService.getItems(collectionName
).then((result)=>{
        console.log(result);
        res.send(result);
    }).catch(err=>console.error(err));
 
   });

   // Getting a single product
router.get('/:id', (req, res) => {  
     firebaseService.getItem(collectionName
, req.params.id).then((result)=>{
    console.log(result);
    res.send(result);
}).catch(err=>console.error(err));
   });

   // Creating a product
router.post('/', (req, res) => {

  let obj ={
        name: req.body.name,
        price: req.body.price,
        department_id: req.body.department_id
    }
    firebaseService.upsertItem(collectionName
,obj).then((result)=>{
        console.log(result);
        res.send(result);
    }).catch(err=>console.error(err));  
   });

   // Updating a product
router.put('/:id', (req, res) => {
    let obj ={
        name: req.body.name,
        price: req.body.price,
        department_id: req.body.department_id
    }
    firebaseService.upsertItem(collectionName
,obj,req.params.id).then((result)=>{
        console.log(result);
        res.send(result);
    }).catch(err=>console.error(err));  
   });

   // Deleting a product
   router.delete('/:id', (req, res) => {
    firebaseService.deleteItem(collectionName,req.params.id).then((result)=>{
        console.log(result);
        res.send(result);
    }).catch(err=>console.error(err)); 
   });

   module.exports = router;