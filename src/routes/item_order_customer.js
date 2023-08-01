import express from 'express';
// import middleware from '../middleware/middleware';
import {  item_order_customer , item } from '../db';

const router = express.Router();


// 상품 추가
router.post('/', async (req, res) => {
  try {
    const { amount,option,price } = req.body;


    const order_customer_create = await order_customer.create({
        amount,option,price
    });

    res.json({
      order_customer_create,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

module.exports = router;
