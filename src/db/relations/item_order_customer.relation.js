import item from "../models/item";
import order_customer from "../models/order_customer"
import item_order_customer from "../models/item_order_customer";

export default () => {
  item_order_customer.belongsTo(order_customer, {
    sourceKey: 'id',
    foreignKey: 'order_customer_id',
  });

  item_order_customer.belongsTo(item, {
    sourceKey: 'item_id',
    foreignKey: 'item_id',
  });
};
