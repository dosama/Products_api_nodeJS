const config = require('config');
const express =  require('express');
const products = require('./routers/products');
const app = express();
app.use(express.json());
app.use('/api/products', products);

const port = process.env.PORT||config.get('api-default-port');
app.listen(port,()=>console.log(`Listening on port ${port}`));

