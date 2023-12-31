import express from 'express';
// import middleware from '../middleware/middleware';
import { option, item } from '../db';
import middleware from '../middleware/node_cache';
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
// 조회
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

//1차 삭제 

router.delete('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const item_search = await item.findOne({ where: { id: itemId } });
    if (!itemId) {
      res.status(404).json({
        message: 'itemId not found',
      });
    }
    console.log(item_search)
    if (item_search.amount == 0) {
      await item.destroy({
        where: {
          id: itemId,
        },
      });
      res.status(200).json({
        message: `${item_search.name} has been deleted`,
      });
    }

    else {
      res.status(200).json({
        message: '현재 수량이 남아있습니다. 삭제하시겠습니까?',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

//2차 삭제

router.delete('/ignore/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;

    await item.destroy({
      where: {
        id: itemId,
      },
    });

    res.status(200).json({
      message: 'ignore deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// 댓글 수정

router.put('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name,option_id,price,type,amount } = req.body;

    let item_find = await item.findOne({
      where: {
        id: itemId,
      },
    });
    console.log(item_find)
    if (!item_find) {
      res.status(404).json({
        message: 'item not found',
      });
    }
    console.log(name);
    console.log(name);
    if(name===undefined || name === null || name =="")
    {
      return res.status(200).json({ message:'이름을 입력해주세요' });
    }
    if(price < 0)
    {
      return res.status(400).json({ message:'알 맞은 가격을 입력해주세요' });
    }
    item_find = await item.update(
      { name,option_id,price,type,amount },
      {
        where: {
          id: itemId,
        },
      },
    );

    res.status(200).json({ message:'sucess' });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});
module.exports = router;
