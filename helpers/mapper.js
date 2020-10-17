const _ =  require('lodash');
const lookupsService = require('../services/lookups-service');
const mappingHelper = {};

mappingHelper.mapProduct=(product)=>{
    if(!product)
    return;
        const productDepartment = _.find(lookupsService.departments,(dep)=>{ return dep.id == product.data.department_id });
       const productsPromotion = _.find(lookupsService.productsPromotions,(promo)=>{ return promo.data.product_id == product.id });
    
        let promotionDetails = null;
        if(productsPromotion)
        {
            promotionDetails = _.find(lookupsService.promotions,(promotion)=>{return promotion.id == productsPromotion.data.promotion_id});
        }
        const result = {
        'id': product.id, 
        'name': product.data.name,
        'price':product.data.price,
        'departmentId':product.data.department_id,
        'departmentName':productDepartment == null ? null:productDepartment.name,
        'promotionId':promotionDetails == null ? null:promotionDetails.id,
        'promotionCode':promotionDetails== null? null :promotionDetails.code,
        'promoDiscounedPrice': promotionDetails== null? null :(product.data.price * promotionDetails.discount)/100,
        'isPromoActive':promotionDetails== null? null : promotionDetails.active};

        return result;
}

module.exports = mappingHelper;
    
   
     