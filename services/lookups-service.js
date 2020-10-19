

const firebaseService = require('../services/firebase-database-service');
const lookupsService = {};
const promotionsCollectionName='Promotions';
const departmentsCollectionName= 'Departments';
const productPromotionsCollectionName = 'ProductsPromotions';

lookupsService.departments = [];
lookupsService.promotions = [];
lookupsService.productsPromotions = [];


lookupsService.mapDepartment=(item)=>{
    return {'id': item.id, 
    'name': item.data.name};
}

lookupsService.mapPromotions=(item)=>{
    return {'id': item.id, 
    'code': item.data.code,
    'discount':item.data.discount,
    'active':item.data.active }
}

lookupsService.loadLookupsData =async ()=>{
    lookupsService.departments = [];
    lookupsService.promotions = [];
    lookupsService.productsPromotions = [];
    try {
        const result = await Promise.all([firebaseService.getItems(departmentsCollectionName
            ),  firebaseService.getItems(promotionsCollectionName
                ), firebaseService.getItems(productPromotionsCollectionName
                    )]);

                 
    result[0].forEach((item)=>{
        lookupsService.departments.push(lookupsService.mapDepartment(item));
    });

    result[1].forEach((item)=>{
        lookupsService.promotions.push(lookupsService.mapPromotions(item));
        });

        lookupsService.productsPromotions =  result[2];
         
    } catch (error) {
        console.error(error);
    }
}
















module.exports = lookupsService;
    
   
     