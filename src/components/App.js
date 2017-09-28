import React, { Component } from 'react';
import Script from 'react-load-script';
import sampleItems from '../sampleItems';
import Destination from './Destination';
import AddItemForm from './AddItemForm';
import Header from './Header';
import Order from './Order';
import { getDestination, googleAPIUrl } from '../helpers';

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: sampleItems,
      order: {},
      destination: {
        start: '',
        end: '',
        miles: 0
      },
      scriptError: false,
      scriptLoaded: false,
      form: {
        start: '',
        end: ''
      }
    };
  }

  /*
    - fat arrow binding for on methods removes the need for
      .bind(this) within your constructor
    - part of babel stage 2
  */
  addToOrder = (itemToShip) => {
    const order = { ...this.state.order };
    const time = Date.now();
    order[`item-${time}`] = itemToShip;
    this.setState({ order });
  }

  handleBlur = () => {
    if (this.state.form.start && this.state.form.end) {
      getDestination(this.state.form.start, this.state.form.end)
        .then(destination => this.setState({ destination }));
    }
  }

  handleChange = (key, value) => {
    this.setState({
      form: {
        ...this.state.form,
        [key]: value
      }
    });
  }

  removeFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  }

  handleScriptError = () => {
    this.setState({ scriptError: true });
  }

  handleScriptLoad = () => {
    this.setState({ scriptLoaded: true });
  }

  render() {
    // google api needs to be loaded for address form to work
    return (
      <div>
        <Header />
        <div className="container">
          <Script
            url={googleAPIUrl}
            onError={this.handleScriptError}
            onLoad={this.handleScriptLoad}
          />
          <div className="Grid Grid--gutters Grid-Main">
            {
              this.state.scriptLoaded && !this.state.scriptError ?
                <div className="Grid-cell main">
                  <div className="content">
                    <Destination
                      start={this.state.form.start}
                      end={this.state.form.end}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                      destination={this.state.destination}
                    />
                    <AddItemForm
                      items={Object.keys(this.state.items).map(key => this.state.items[key])}
                      addToOrder={this.addToOrder}
                    />
                  </div>
                </div>
                :
                <div>Loading...</div>
            }
            <div className="Grid-cell aside">
              <div className="content">
                <Order
                  destination={this.state.destination}
                  order={this.state.order}
                  removeFromOrder={this.removeFromOrder}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
