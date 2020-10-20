const { mapDepartment,mapPromotions } = require("../../services/lookups-service");

describe("mapDepartment()", () => {
    it("should return true", () => {
        expect(mapDepartment({'id':'123456', data:{'name':'department Name'}})).toEqual({'id': '123456', 
            'name': 'department Name'});
    });
});

describe("mapPromotions()", () => {
    it("should return true", () => {
        expect(mapPromotions({id: '1234', data:{ 
        'code': 'promo1',
        'discount':'50',
        'active':true }})).toEqual({'id': '1234', 
            'code': 'promo1',
            'discount':'50',
            'active':true });
    });
});


// mapDepartment=(item)=>{
//     return {'id': item.id, 
//     'name': item.data.name};
// }

// mapPromotions=(item)=>{
//     return {'id': item.id, 
//     'code': item.data.code,
//     'discount':item.data.discount,
//     'active':item.data.active }
// }
