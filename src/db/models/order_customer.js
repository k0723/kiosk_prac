import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class order_customer extends Model {}

order_customer.init(
  {
    state : DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: 'order_customer',
  },
);

export default order_customer;
