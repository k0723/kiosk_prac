import sequelize from './sequelize';
import option from './models/option';
import item from './models/item';
import item_order_customer from './models/item_order_customer';
import order_customer from './models/order_customer';
import order_item from './models/order_item';

import relations from './relations';

Object.values(relations).forEach((relationsFunction) => {
  relationsFunction();
});

export { sequelize, option, item, item_order_customer, order_customer, order_item};
