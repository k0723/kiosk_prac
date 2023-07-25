import Item from '../models/item';
import option from '../models/option';

export default () => {
  option.hasMany(Item, {
    targetKey: 'id',
    foreignKey: 'option_id',
  });
};
