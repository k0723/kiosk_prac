import express from 'express';
import middleware from '../middleware/middleware';
import { option, item } from '../db';

const router = express.Router();


// 상품 추가
router.post('/add', async (req, res) => {
  try {
    const { name,option_id,price,type,amount } = req.body;

    if(name === null || price === null)
    {
        return res.status(405).json({
            message: `${name}을 입력해주세요`});
    }

    if(!type == "COFFEE" ||type == "JUICE" ||type == "FOOD" )
    {
        return res.status(405).json({
            message: `알맞은 타입을 지정해주세요`});
    }

    const itemCreate = await item.create({
        name,
        option_id,
        price,
        type,
        amount
    });

    res.json({
      itemCreate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});


module.exports = router;
