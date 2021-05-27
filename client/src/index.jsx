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
      sold_by: '',
      director: '',
      actor1: '',
      actor2: '',
      rating: '',
      average: null,
      reviewcount: null
    }
  }

  componentDidMount() {

    const productid = new URL(window.location).pathname.slice(4, );

    $.ajax({
      url: 'http://localhost:3002/overview/' + productid,
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

    $.ajax({
      url: 'http://localhost:3001/Information/' + productid,
      method: 'GET',
      success: (res) => {
        this.setState({
          actor1: res.cast[0],
          actor2: res.cast[1],
          director: res.cast[res.cast.length - 1],
          rating: res.rating
        })
      },
      error: (error) => {
        console.log(error);
      }
    })

    $.ajax({
      url: 'http://localhost:3004/averagereview/' + productid,
      method: 'GET',
      success: (res) => {
        this.setState({
          average: res.averageReviews,
          reviewcount: res.totalReviews
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
              actor1={this.state.actor1}
              actor2={this.state.actor2}
              director={this.state.director}
              rating={this.state.rating}
              average={this.state.average}
              reviewcount={this.state.reviewcount}
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

ReactDOM.render(<Overview />, document.getElementById("product-overview"));