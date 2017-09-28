import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice, getOrderTotal } from '../helpers';

function OrderTotal({ order, miles }) {
  return (
    <div id="order-total">
      <p>
        Miles:
        <span className="order-total-item">{miles}</span>
      </p>
      <p className="total">
        <strong>
          Estimated Total:
          <span className="order-total-item">{formatPrice(getOrderTotal(order, miles))}</span>
        </strong>
      </p>
    </div>
  );
}

OrderTotal.propTypes = {
  order: PropTypes.shape(PropTypes.shape({
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    serviceCharge: PropTypes.number.isRequired
  }).isRequired).isRequired,
  miles: PropTypes.number.isRequired
};

export default OrderTotal;
