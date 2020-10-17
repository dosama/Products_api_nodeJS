const express =  require('express');
const firebaseService = require('../services/firebase-service');
const lookupsService = require('../services/lookups-service');
const collectionName='Departments';
const router = express.Router();

// Getting all the departments
router.get('/', (req, res) => {
        res.send(lookupsService.departments);
   });

   // Getting a single department
router.get('/:id', (req, res) => {  
     firebaseService.getItem(collectionName
, req.params.id).then((result)=>{
    res.send(result);
}).catch(err=>console.error(err));
   });

   // Creating a department
router.post('/', (req, res) => {

  let obj ={
        name: req.body.name
    }
    firebaseService.upsertItem(collectionName
,obj).then((result)=>{
        res.send(result);
    }).catch(err=>console.error(err));  
   });

   // Updating a department
router.put('/:id', (req, res) => {
    let obj ={
        name: req.body.name
    }
    firebaseService.upsertItem(collectionName
,obj,req.params.id).then((result)=>{
      
        res.send(result);
    }).catch(err=>console.error(err));  
   });

   // Deleting a department
   router.delete('/:id', (req, res) => {
    firebaseService.deleteItem(collectionName,req.params.id).then((result)=>{
      
        res.send(result);
    }).catch(err=>console.error(err)); 
   });

   module.exports = router;