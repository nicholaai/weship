import React from 'react';
import PropTypes from 'prop-types';
import OrderList from './OrderList';
import OrderTotal from './OrderTotal';
import { getMiles } from '../helpers';

function Order({ order, destination, removeFromOrder }) {
  const miles = getMiles(destination.miles);
  return (
    <div>
      <div className="content-inner content-header">
        <h3>Your Order</h3>
      </div>
      <div className="content-inner">
        <OrderTotal
          miles={miles}
          order={order}
        />
        <OrderList
          order={order}
          miles={miles}
          removeFromOrder={removeFromOrder}
        />
      </div>
    </div>
  );
}

Order.propTypes = {
  order: PropTypes.shape(PropTypes.shape({
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    serviceCharge: PropTypes.number.isRequired
  }).isRequired).isRequired,
  destination: PropTypes.shape({
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    miles: PropTypes.number.isRequired
  }).isRequired,
  removeFromOrder: PropTypes.func.isRequired
};

export default Order;
