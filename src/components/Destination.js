import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';

function Destination({ start, end, onChange, onBlur }) {
  const generateProps = (value, destinationPoint) =>
    (
      {
        value,
        onChange: newValue => onChange(destinationPoint, newValue),
        onBlur: () => onBlur(),
        placeholder: destinationPoint === 'start' ? 'Your Addresss' : 'Receiving Address'
      }
    );
  const startProps = generateProps(start, 'start');
  const endProps = generateProps(end, 'end');

  return (
    <div className="content-inner content-header">
      <h3>Where are you sending your items?</h3>
      <PlacesAutocomplete inputProps={startProps} />
      <PlacesAutocomplete inputProps={endProps} />
    </div>
  );
}

Destination.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired
};

export default Destination;
