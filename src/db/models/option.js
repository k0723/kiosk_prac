import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class option extends Model {}

option.init(
  {
    extra_price: DataTypes.BIGINT,
    shot_price: DataTypes.BIGINT,
    hot: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: 'option',
  },
);

export default option;
