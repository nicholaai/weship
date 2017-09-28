import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

function ItemList({ items }) {
  const radioButtons = items.map(item =>
    (
      <Item
        key={`${item.name}`}
        {...item}
        items={items}
        setName="name"
      />
    )
  );
  return (
    <div className="radio-container">
      {radioButtons}
    </div>
  );
}

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    serviceCharge: PropTypes.number.isRequired
  }).isRequired).isRequired
};

export default ItemList;
