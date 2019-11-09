const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Wishlist = require('../models/wishlists');
const Product = require('../models/products');



router.get('/', (req, res, next) => {
    Wishlist.find()
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                wishlist: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        pricequote: doc.pricequote,
                        request: {
                            type: 'GET',
                            url: process.env.BASE_URL + 'wishlists/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            error: err
        })
});


router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Wishlist was created'
    });
});

router.get('/:wishlistId', (req, res, next) => {
    res.status(200).json({
        message: 'Wishlist details for',
        wishlistId: req.params.wishlistId
    });
});

router.delete('/:wishlistId', (req, res, next) => {
    res.status(200).json({
        message: 'Wishlist deleted for',
        wishlistId: req.params.wishlistId
    });
});

module.exports = router;