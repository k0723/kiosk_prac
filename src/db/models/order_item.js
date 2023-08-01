import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class order_item extends Model {}

const orderItemState = {
  "ORDERED": 0,
	"PENDING": 1,
	"COMPLETED": 2,
	"CANCELED": 3,
}

order_item.init(
  {
    item_id: DataTypes.BIGINT,
    amount : DataTypes.BIGINT,
    state :{ 
      type : DataTypes.ENUM(Object.values(orderItemState)),
      defaultValue : "ORDERED",
    },
  },
  {
    sequelize,
    modelName: 'order_item',
  },
);

export default order_item;
