import React from 'react';
import PropTypes from 'prop-types';

function Item({ image, serviceCharge, name, setName }) {
  const styles = {
    backgroundImage: `url(${image})`
  };
  return (
    <div className="radio-item">
      <input
        className="item-option"
        id={name}
        type="radio"
        name={setName}
        value={`{"name":"${name}", "serviceCharge":"${serviceCharge}"}`}
      />
      <label
        className="item-option-img"
        htmlFor={name}
        style={styles}
      />
    </div>
  );
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  serviceCharge: PropTypes.number.isRequired,
  setName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default Item;
