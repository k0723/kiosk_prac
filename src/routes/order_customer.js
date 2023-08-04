import express from 'express';
// import middleware from '../middleware/middleware';
import { order_customer, item_order_customer , item} from '../db';
const {Transaction } = require("../service/index");

const router = express.Router();


// 상품 추가
router.post('/', async (req, res) => {
  try {
    const { state } = req.body;


    const order_customer_create = await order_customer.create({
        state
    });
  

    const item_order_customer_create = await item_order_customer.create({
      order_customer_id : order_customer_create.id
  });
    const amount = item_order_customer_create.amount;
    const price = item_order_customer_create.price;
    const result = amount * price
    res.json({
      message : `가격은 ${result}입니다.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.put('/order_customer_id', async (req, res) => {
  const {state} = req.body;
  const {order_customer_id} = res.params;
  try {
        let order_customer_find = await order_customer.findOne({
          where: {
            id: order_customer_id,
          },
          }
        );
        if(!order_customer_find.state === true)
        {
          return res.status(405).json({
            message: '완료된 주문은 취소할 수 없습니다',
          });
        }

        let item_order_customer_find = await item_order_customer.findOne({
          where: {
            id: order_customer_id,
          },
          }
        );

          let order_customer_update = await order_customer.update(
              { state : state,},
              {
                where: {
                  id: orderItem_Id,
                },
              },
              { transaction: t }
            );
          let item_update = await item.update(
            { amount : item_order_customer_find.amount-1,},
            {
              where: {
                id: item_order_customer_find.item_id,
              },
            },
            { transaction: t }
          );

    await t.commit();
  } catch (transactionError) {
    console.error(transactionError);
    await t.rollback();
    return res.status(400).json({ errorMessage: `유저 생성에 실패하였습니다.` })
  }
});

module.exports = router;
