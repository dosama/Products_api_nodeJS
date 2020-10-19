const config = require('config');
const express =  require('express');
const cors = require('cors')
const products = require('./routers/products');
const departments = require('./routers/departments');
const promotions = require('./routers/promotions');
const lookupsService = require('./services/lookups-service');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/products', products);
app.use('/api/departments', departments);
app.use('/api/promotions', promotions);

lookupsService.loadLookupsData();
const port = config.get('api-default-port');
//process.env.PORT||config.get('api-default-port');
app.listen(port,()=>console.log(`Listening on port ${port}`));

