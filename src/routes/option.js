import express from 'express';
// import middleware from '../middleware/middleware';
import {  option , option_item ,item} from '../db';
import middleware from '../middleware/node_cache';

const router = express.Router();


// 상품 추가
router.post('/', middleware,async (req, res) => {
  try {
    const { extra_price,shot_price,hot } = req.body;

    if(extra_price === 0)
    {
        return  res.status(405).json({
           message : '선택 불가'
          });
    }

    if(shot_price === 0)
    {
        return  res.status(405).json({
           message : '추가 불가'
          });
    }

    const option_create = await option.create({
        extra_price,shot_price,hot
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
