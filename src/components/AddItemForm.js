import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemList from './ItemList';

class AddItemForm extends Component {
  addItem = (e) => {
    e.preventDefault();
    // lazy form validation for incomplete item add
    const radioVals = this.itemForm.name.value ?
      JSON.parse(this.itemForm.name.value) :
      {
        name: 'Box',
        serviceCharge: 0
      };
    const item = {
      width: (this.width.value || '0'),
      length: (this.length.value || '0'),
      height: (this.height.value || '0'),
      name: radioVals.name,
      serviceCharge: parseInt(radioVals.serviceCharge, 10)
    };
    this.props.addToOrder(item);
    this.itemForm.reset();
  }

  render() {
    return (
      <div className="content-inner">
        <h3>Which item are you sending?</h3>
        <form ref={input => (this.itemForm = input)} className="item-edit" onSubmit={this.addItem}>
          <ItemList items={this.props.items} />
          <h3 className="no-margin-btm">What are the item dimensions (in feet)?</h3>
          <p className="item-option-disclaimer">
            - Take your best guess! We double check measurements to create your final price.
          </p>
          <div className="item-dimensions-container">
            <input ref={input => (this.length = input)} type="text" placeholder="Length" />
            <input ref={input => (this.width = input)} type="text" placeholder="Width" />
            <input ref={input => (this.height = input)} type="text" placeholder="Height" />
          </div>
          <button className="btn-brand" type="submit">+ Add Item</button>
        </form>
      </div>
    );
  }
}

AddItemForm.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    serviceCharge: PropTypes.number.isRequired
  }).isRequired).isRequired,
  addToOrder: PropTypes.func.isRequired
};

export default AddItemForm;
