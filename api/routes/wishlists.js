const express = require('express');
const router = express.Router();



router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Wishlist was fetched'
    });
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