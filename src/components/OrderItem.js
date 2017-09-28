import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice, getSingleItemPrice, getPerMileCost } from '../helpers';

function OrderItem({ index, singleOrder, removeFromOrder, miles }) {
  const removeButton = <button onClick={() => removeFromOrder(index)}>&times;</button>;
  return (
    <li key={index}>
      <span>{singleOrder.name} {removeButton}</span>
      <span className="order-list-item price">
        {formatPrice(getSingleItemPrice(singleOrder, miles))}
      </span>
      <p className="order-list-item">
        Service Charge {formatPrice(singleOrder.serviceCharge)}
      </p>
      <p className="order-list-item">
        Shipping Charge {formatPrice(getPerMileCost(singleOrder, miles))}
      </p>
      <p className="order-list-item sq-ft">Square Feet: { singleOrder.width * singleOrder.length }</p>
      <p className="order-list-item measurements">
        L:{ singleOrder.length } - W:{ singleOrder.width } - H:{ singleOrder.height }
      </p>
    </li>
  );
}

OrderItem.propTypes = {
  index: PropTypes.string.isRequired,
  singleOrder: PropTypes.shape({
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    serviceCharge: PropTypes.number.isRequired
  }).isRequired,
  removeFromOrder: PropTypes.func.isRequired,
  miles: PropTypes.number.isRequired
};

export default OrderItem;
