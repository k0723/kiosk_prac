import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class order_item extends Model {}

order_item.init(
  {
    item_id: DataTypes.BIGINT,
    amount : DataTypes.BIGINT,
    state : DataTypes.BIGINT,
  },
  {
    sequelize,
    modelName: 'order_item',
  },
);

export default order_item;
