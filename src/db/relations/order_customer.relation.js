import item_order_customer from '../models/item_order_customer';
import order_customer from '../models/order_customer';


export default () => {
  order_customer.belongsTo(item_order_customer, {
    targetKey: 'id',
    foreignKey: 'order_customer_id',
  });
};