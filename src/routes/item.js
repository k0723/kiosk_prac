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

router.get('/search', async (req, res) => {
  try {

    const search_all = await item.findAll();

    if (!search_all[0]) {
      res.status(404).json({
        message: 'search not found',
      });
    }

    res.json({ data: search_all[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.get('/search/:type_select', async (req, res) => {
  try {
    const { type_select } = req.params;
    console.log(type_select);
    if (!type_select) {
      res.status(400).json({
        message: 'type not found',
      });
    }

    const search_type = await item.findAll({ where: { type: type_select } });

    if (!search_type[0]) {
      res.status(404).json({
        message: 'search not found',
      });
    }

    res.json({ data: search_type });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});


module.exports = router;
