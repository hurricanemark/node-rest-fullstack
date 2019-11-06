const express = require('express');
const router = express.Router();

const Product = require('../models/products');
const mongoose = require('mongoose');

/* GET: return all products */
router.get('/', (req, res, next) => {
    Product.find()  /* find all, note tht we could use limit here */
        .select('_id name description price')
        .exec()
        .then(docs => {
            //console.log('Fetching all products from mongoose database\n', docs);
            const response = {
                count: docs.length,
                products: docs.map(doc =>{
                    return {
                        name: doc.name,
                        description: doc.description,
                        price: doc.price,
                        request: {
                            type: 'GET',
                            url: '' + process.env.BASE_URL + 'products/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err 
        })
    }); 
});

router.post('/', (req, res, next) => {
    /* from models using mongoose */
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price      
    });

    /* use promise syntax */
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /products",
                createdProduct: {
                    name: result.name,
                    description: result.description,
                    price: result.price,
                    _id: result.id,
                    request: {
                        type: 'GET',
                        description: 'GET_SPECIFIED_PRODUCT',
                        url: process.env.BASE_URL + 'products/' + result.id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err 
            });
        });
});

/* GET: return specific product by name */
router.get('/:productId',( req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('_id name description price')
        .exec()
        .then(doc => {
            //console.log("From mongoose database\n", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                })
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(500).json({error: err});
        });

});


router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;

    const updateOps = {};

    /* send request like this:
        [{ "propName": "price", "value": "20.99"}, {"propName": "author", "value": "Mark Nguyen"}]
    */

    for (const ops of req.body) {
       updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            //console.log(result);
            res.status(200).json({
                message: 'Product updated',
                show_update: {
                    type: 'GET',
                    description: 'GET_UPDATE_CONTENT',
                    url: process.env.BASE_URL + 'products/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    description: 'You can add new product entry with...',
                    body: { name: 'String', description: 'String', price: 'Number'}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err 
            });
            
        });
});

module.exports = router;
