import item from "../models/item"
import option from "../models/option";
import order_item from "../models/order_item";
import item_order_customer from "../models/item_order_customer";
import order_customer from "../models/order_customer";

export default () => {
  item.belongsTo(option, {
    targetKey: 'id',
    foreignKey: 'option_id',
  });

  item.hasMany(order_item, {
    targetKey: 'item_id',
    foreignKey: 'id',
  });

  item.hasMany(item_order_customer, {
    targetKey: 'item_id',
    foreignKey: 'id',
  });
};
