/* main app entry point */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const wishlistRoutes = require('./api/routes/wishlists');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb+srv://' + process.env.MONGO_ATLAS_ADMIN_USER + ':' + process.env.MONGO_ATLAS_PASSWD + '@node-rest-shop-jwc5r.mongodb.net/test?retryWrites=true&w=majority', 
    { useNewUrlParser: true, 
      useUnifiedTopology: true });
      
/* get rid of deprecation warnings */
mongoose.Promise = global.Promise;

/* logging in dev mode using morgan */
app.use(morgan('dev'));

/* body-parser middleware to parse URL encoded requests */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Prevent CORS errors */
app.use((req ,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

/* Handling routes */
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/wishlists', wishlistRoutes);


/* Handling invalid requests below this point */
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;