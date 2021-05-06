const $ = require( "jquery" );

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_name: '',
      package_name: '',
      other_sellers: [],
      list_price: null,
      price: null
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
          other_sellers: res.other_sellers,
          list_price: res.price.price,
          price: res.price.price
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  render() {
    return (
      <div className="overview">
       <h1>{this.state.product_name}</h1>
      </div>
    )
  }
}

ReactDOM.render(<Overview />, document.getElementById("root"));

// const OverviewSchema = {
//   product_id: {
//     type: String,
//     unique: true
//   },
//   product_name: String,
//   package_name: String,
//   price: priceSchema,
//   other_sellers: [sellerSchema],
//   shipping: shippingSchema,
//   inventory: inventorySchema
// }