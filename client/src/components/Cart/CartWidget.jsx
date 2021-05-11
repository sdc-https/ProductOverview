const moment = require('moment');
const React = require('react');
import Stock from '../Stock/Stock.jsx';

class CartWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cart">
        <form>
          <input type="radio" value="buy" defaultChecked></input>
          <label htmlFor="buy"><b>&nbsp;Buy new:</b></label>
          <span className="buy">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#09;${this.props.price}</span>
        </form>
        <span>Get&nbsp;<b>Fast, Free Shipping&nbsp;</b>with&nbsp;</span>
        <a className="a-link-normal" href="https://www.amazon.com/amazonprime?_encoding=UTF8&primeCampaignId=primedp_ventures_desktopBelowThreshold&ref=primedp_ventures_desktopBelowThreshold">Amazon Prime</a>
        <span>&nbsp;&amp;&nbsp;</span>
        <a className="a-link-normal" href="https://www.amazon.com/b?node=18726306011">Free Returns</a><br></br><br></br>
        <span>Free delivery: <b>{moment().add(5, 'days').format("dddd, MMMM D")}</b></span><br></br>
        <span>on orders over $25.00 shipped by Amazon.</span>
        <a className="a-link-normal" href="https://www.amazon.com/gp/help/customer/display.html/ref=ftinfo_dp_?ie=UTF8&pop-up=1&nodeId=3510241"> Details</a><br></br><br></br>
        <span>Fastest delivery: <b>{moment().add(2, 'days').format("dddd, MMMM D")}</b></span><br></br>
        <span>Order within <b>{moment().endOf('day').fromNow()}</b></span>
        <a className="a-link-normal" href="https://www.amazon.com/gp/help/customer/display.html/ref=ddm_ft_dp?ie=UTF8&pop-up=1&nodeId=3510241"> Details</a><br></br><br></br>
        <span>Select delivery location</span><br></br><br></br>
        <Stock in_stock={this.props.in_stock} /><br></br><br></br>
        <span>Ships from</span>
        <span className="a-color-secondary"> {this.props.ships_from}</span><br></br>
        <span>Sold by</span>
        <span className="a-color-secondary">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.sold_by}</span>
      </div>
    )
  }
}

export default CartWidget;