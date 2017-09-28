import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

// prices are stored in cents
export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

// returns miles rounded to 2nd decimal point or if no milage set returns 0
export function getMiles(miles) {
  return Math.round((miles || 0) * 100) / 100;
}

export function getPerMileCost(item, miles) {
  // multiply by 100 to convert to cents
  const sqFt = item.width * item.length;
  const perSqFt = 2;
  return (sqFt * perSqFt) * miles * 100;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
export function getDistanceFromLatLong(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  const distanceInMiles = d / 1.609344;
  return distanceInMiles;
}

export function getSingleItemPrice(item, miles) {
  return (item.serviceCharge || 0) + getPerMileCost(item, (miles || 0));
}

export function getDestination(startAddress, endAddress) {
  const startLatLng = geocodeByAddress(startAddress)
    .then(results => getLatLng(results[0]));
  const endLatLng = geocodeByAddress(endAddress)
    .then(results => getLatLng(results[0]));

  return Promise.all([startLatLng, endLatLng])
    .then((data) => {
      // promise.all parameter order with iterable lists so we can ref with indices
      const start = data[0];
      const end = data[1];
      const distanceInMiles = getDistanceFromLatLong(start.lat, start.lng, end.lat, end.lng);
      return {
        start: startAddress,
        end: endAddress,
        miles: distanceInMiles
      };
    })
    .catch(error => new Error('Error', error));
}

/*
  - calculates the order total by adding the total cost of each item
  - order comes in as an object of objects
  - objective is to loop over each object to find each objects cost and
    create your total
*/
export function getOrderTotal(order, milesDistance) {
  const orderIds = Object.keys(order);
  const miles = getMiles(milesDistance);
  return orderIds.reduce((prevTotal, key) => {
    const item = order[key];
    if (item) {
      return prevTotal + getSingleItemPrice(item, miles);
    }
    return prevTotal;
  }, 0);
}

/*
  - hardcoded API key for example purposes only
  - this should never be done in production or placed on github
*/
export const googleAPIUrl = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
