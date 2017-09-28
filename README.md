## WeShip

This is a pricing calculator that allows a customer to receive an estimated price for shipping their items. By the time customers arrive at this pricing calculator, they have decided they are ready to ship their items, so we don’t need to worry about educating them on the service or convincing them to use the service; they’re excited to see the pricing quote!


<img src="/public/demo.png" width="1000" alt="project screenshot">

### Technologies Used

- React
- JSX
- Sass
- Yarn
- ESlint - Airbnb JavaScript Style Guide
- Create React App

## Getting Started

To install the packages, you can run:

### `yarn` 

Next, you **must place a Google Maps Geocoding API key** in `src/helpers.js` for the app to work.

```
export const googleAPIUrl = `https://maps.googleapis.com/maps/api/js?key=${KEY}&libraries=places`;
```

You can get a key by following instructions [here](https://developers.google.com/maps/documentation/javascript/get-api-key).

To run the app, execute:

### `yarn start` 

## The Business

### Inputs

Customers come to us with:

- The object to ship, like a box or a couch; objects have a length, width, and height
- A destination they want to send those objects to

You can assume that our customers only have five ‘types’ of things that they ship:

- Boxes
- Couches
- Chairs
- Lamps
- Beds

### Pricing
- Assume we charge $2 per square foot per mile shipped.
- An object measuring 3sqft shipped 10 miles would cost at least $60
- Assume also a service charge for hard to carry objects that are not packed, like lamps, beds, chairs, or couches.    Basically anything other than ‘boxes’
- Service charges are as follows
  - Couch = $50
  - Chair = $50
  - Lamp = $100
  - Bed = $20
- Finally, assume that the customer might not have a tape measure handy and will make mistakes in measurement. So, until we receive the objects and verify the dimensions, we will only be providing a price estimate - and need to make that clear.

