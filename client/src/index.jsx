const $ = require( "jquery" );
const React = require('react');
const ReactDOM = require('react-dom');

import OverviewWidget from './components/Overview/OverviewWidget.jsx';
import CartWidget from './components/Cart/CartWidget.jsx';

class Overview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product_name: '',
      package_name: '',
      list_price: null,
      price: null,
      save: null,
      save_pct: null,
      sellers: [],
      form: [],
      inventory: null,
      in_stock: null,
      ships_from: '',
      sold_by: ''
    }
  }

  componentDidMount() {
    const productid = "'" + Math.floor(Math.random() * 100).toString() + "'";

    $.ajax({
      url: 'http://localhost:3000/overview/' + productid,
      method: 'GET',
      success: (res) => {
        this.setState({
          product_name: res.product_name,
          package_name: res.package_name,
          list_price: res.price.list_price,
          price: res.price.price,
          save: res.price.list_price - res.price.price,
          save_pct: Math.round((res.price.list_price - res.price.price) / res.price.list_price * 100, 0),
          sellers: res.other_sellers,
          form: res.form,
          in_stock: res.inventory.in_stock,
          ships_from: res.shipping.ships_from,
          sold_by: res.shipping.sold_by
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <OverviewWidget
              product_name={this.state.product_name}
              package_name={this.state.package_name}
              price={this.state.price}
              list_price={this.state.list_price}
              save={this.state.save}
              save_pct={this.state.save_pct}
              sellers={this.state.sellers}
              forms={this.state.form}
            />
          </div>
          <div className="col-md-3">
            <CartWidget
              price={this.state.price}
              in_stock={this.state.in_stock}
              ships_from={this.state.ships_from}
              sold_by={this.state.sold_by}
            />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Overview />, document.getElementById("root"));