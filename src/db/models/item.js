import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class item extends Model {}
item.init(
  {
    name: DataTypes.STRING,
    option_id: DataTypes.BIGINT,
    price : DataTypes.BIGINT,
    defaultValue : 0,
    type : DataTypes.ENUM("coffee","juice","food"),
    amount : DataTypes.BIGINT,
    createdAt: DataTypes.TIME,
    updatedAt: DataTypes.TIME,
  },
  {
    sequelize,
    modelName: 'item',
  },
);

export default item;
