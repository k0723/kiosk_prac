import Item from '../models/item';
import option from '../models/option';
import order_item from '../models/order_item';

export default () => {
    order_item.belongsTo(Item, {
    targetKey: 'id',
    foreignKey: 'item_id',
  });
};