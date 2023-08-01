import express from 'express';
// import middleware from '../middleware/middleware';
import { order_customer, item_order_customer } from '../db';

const router = express.Router();


// 상품 추가
router.post('/', async (req, res) => {
  try {
    const { state } = req.body;


    const order_customer_create = await order_customer.create({
        state
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
