import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class item_order_customer extends Model {}

item_order_customer.init(
  {
    item_id: {type : DataTypes.BIGINT,
    foreignKey : true},
    order_customer_id: {
    type : DataTypes.BIGINT,
    foreignKey : true},
    amount : DataTypes.BIGINT,
  },
  {
    sequelize,
    modelName: 'item_order_customer',
  },
);

export default item_order_customer;
