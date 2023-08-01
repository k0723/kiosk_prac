import express from 'express';
// import middleware from '../middleware/middleware';
import { option, order_item, sequelize, item  } from '../db';
const {Transaction } = require("../service/index");

const router = express.Router();


// 상품 추가
router.post('/:item_id', async (req, res) => {
  try {
    const {amount,state } = req.body;
    const {item_id} = res.params;
    if(!type == "ORDERED" ||type == "PENDING" ||type == "COMPLETED" || type == "CANCELED")
    {
        return res.status(405).json({
            message: `알맞은 타입을 지정해주세요`});
    }

    const order_itemCreate = await order_item.create({
        item_id,
        amount,
        state
    });

    res.json({
        order_itemCreate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});


// 댓글 수정

router.put('/:orderItem_Id', async (req, res) => {

    const {state} = req.body;
    const {orderItem_Id} = res.params;

    try {
        // orderItem_find 테이블에  조회합니다.
        let orderItem_find = await order_item.findOne({
            where: {
              id: orderItem_Id,
            },
          }
          );

          let Item_find = await item.findOne({
            where: {
              id: orderItem_find.item_id,
            },
          }
          );

          if(orderItem_find.state == "pending"&&state == "completed")
          {
            let orderItem_update = await order_item.update(
                { state : state,
                    amount : orderItem_find.amount+1 },
                {
                  where: {
                    id: orderItem_Id,
                  },
                },
                { transaction: t }
              );
          }

          if(orderItem_find.state == "completed")
          {
            if(orderItem_find.amount > Item_find.amount)
            {
                return res.status(400).json({ errorMessage: `현재 수량이 발주 수량보다 적어 발주 취소가 불가능합니다` })
            }
            let orderItem_update = await order_item.update(
                { state : state,
                    amount : orderItem_find.amount-1 },
                {
                  where: {
                    id: orderItem_Id,
                  },
                },
                { transaction: t }
              );
          }

            let orderItem_update = await order_item.update(
                { state : state,
                    amount : orderItem_find.amount+1 },
                {
                  where: {
                    id: orderItem_Id,
                  },
                },
              );

        // UserInfos 테이블에 사용자 정보를 추가합니다.
    
        // 트랜잭션을 사용한 모든 로직을 Commit, DB에 반영합니다.
        await t.commit();
      } catch (transactionError) {
        // 에러가 발생하였다면, 트랜잭션을 사용한 모든 쿼리를 Rollback, DB에 반영하지 않습니다.
        console.error(transactionError);
        await t.rollback();
        return res.status(400).json({ errorMessage: `유저 생성에 실패하였습니다.` })
      }
});
module.exports = router;
