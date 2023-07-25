import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class item extends Model {}
item.init(
  {
    name: DataTypes.STRING,
    option_id: DataTypes.BIGINT,
    price : DataTypes.BIGINT,
    type : ENUMDataTypes.ENUM,
    amount : DataTypes.BIGINT
  },
  {
    sequelize,
    modelName: 'item',
  },
);

export default item;
