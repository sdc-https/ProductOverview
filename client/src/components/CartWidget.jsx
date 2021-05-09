const moment = require('moment');
import Stock from './Stock.jsx';

class CartWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cart">
        <form>
          <input type="radio" value="buy" defaultChecked></input>
          <label htmlFor="buy"><b>&nbsp;Buy new:</b></label><span>&#09;${this.props.price}</span>
        </form>
        <span>Get&nbsp;<b>Fast, Free Shipping&nbsp;</b>with&nbsp;<a href="https://www.amazon.com/amazonprime?_encoding=UTF8&primeCampaignId=primedp_ventures_desktopBelowThreshold&ref=primedp_ventures_desktopBelowThreshold">Amazon Prime</a>&nbsp;&amp;&nbsp;<a href="https://www.amazon.com/b?node=18726306011">Free Returns</a></span><br></br><br></br>
        <span>Free delivery: <b>{moment().add(5, 'days').format("dddd, MMMM D")}</b></span><br></br>
        <span>on orders over $25.00 shipped by Amazon. <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ftinfo_dp_?ie=UTF8&pop-up=1&nodeId=3510241">Details</a></span><br></br><br></br>
        <span>Fastest delivery: <b>{moment().add(2, 'days').format("dddd, MMMM D")}</b></span><br></br>
        <span>Order within <b>{moment().endOf('day').fromNow()}</b></span><br></br>
        <span><a href="https://www.amazon.com/gp/help/customer/display.html/ref=ddm_ft_dp?ie=UTF8&pop-up=1&nodeId=3510241">Details</a></span><br></br><br></br>
        <span>Select delivery location</span><br></br><br></br>
        <Stock in_stock={this.props.in_stock} /><br></br><br></br>
        <span>Ships from {this.props.ships_from}</span><br></br>
        <span>Sold by&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.sold_by}</span>
      </div>
    )
  }
}

export default CartWidget;