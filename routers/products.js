const express =  require('express');
const _ =  require('lodash');
const firebaseService = require('../services/firebase-service');
const mappingHelper = require('../helpers/mapper');
const router = express.Router();
const collectionName='Products';

// Getting all the products
router.get('/', (req, res) => {
let responseResult=[];
   firebaseService.getItems(collectionName).then((result)=>{
let products = result;
products.forEach(product => {
    responseResult.push(mappingHelper.mapProduct(product));               
                    });
                    res.send(responseResult);
                }).catch(err=>console.error(err)); 
   });

   // Getting filtered products
   
router.get('/department/:depId/promotion/:promoId', (req, res) => {
    let responseResult = [];
    let query = typeof req.params.depId === 'undefined' 
    ||!req.params.depId || req.params.depId != 'null'? null 
    :{'key':'department_id', 'operator':'==','value':req.params.depId};

    firebaseService.getItems(collectionName, query
).then((result)=>{
let products = result;
    products.forEach(product => {
        responseResult.push(mappingHelper.mapProduct(product));
       });
  
       if(req.params.promoId && req.params.promoId != 'null'){
         
        responseResult = _.filter(responseResult,(o)=>{return o.promotionId == req.params.promoId});
       }
      
    res.send(responseResult);
}).catch(err=>console.error(err));
 
   });

   // Getting a single product
router.get('/:id', (req, res) => {  
     firebaseService.getItem(collectionName
, req.params.id).then((result)=>{
  
    res.send(mappingHelper.mapProduct(result));
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
        res.send(result);
    }).catch(err=>console.error(err));  
   });

   // Deleting a product
   router.delete('/:id', (req, res) => {
    firebaseService.deleteItem(collectionName,req.params.id).then((result)=>{
        res.send(result);
    }).catch(err=>console.error(err)); 
   });

   module.exports = router;