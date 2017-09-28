import React from 'react';
import PropTypes from 'prop-types';
import OrderItem from './OrderItem';

function OrderList({ order, miles, removeFromOrder }) {
  return (
    <ol className="order">
      {
        Object.keys(order).map(key =>
          (
            <OrderItem
              key={key}
              index={key}
              singleOrder={order[key]}
              miles={miles}
              removeFromOrder={removeFromOrder}
            />
          )
        )
      }
    </ol>
  );
}

OrderList.propTypes = {
  order: PropTypes.shape(PropTypes.shape({
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    serviceCharge: PropTypes.number.isRequired
  }).isRequired).isRequired,
  removeFromOrder: PropTypes.func.isRequired,
  miles: PropTypes.number.isRequired
};

export default OrderList;
