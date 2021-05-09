import SellerTable from './SellerTable.jsx';
import FormWidget from './FormWidget.jsx';

class OverviewWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="overview">
       <span className="product-name"><b>{this.props.product_name}</b></span><br></br>
       <span className="product-package"><b>{this.props.package_name}</b></span><br></br>
       <span className="product-cast">Various &#40;Actor, Director&#41; | Rated: PG-13 | Format: DVD</span><br></br>
       <span className="product-rating">4.8 out of 5 21,911 ratings</span><br></br>
       <span className="product-listprice">List Price:&nbsp;<strike>${this.props.list_price}</strike><span>&nbsp;&nbsp;<a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GQ6B6RH72AX8D2TD&ref_=dp_hp">Details</a></span></span><br></br>
       <span className="product-price">Price:&nbsp;<b>${this.props.price}</b><span>&nbsp;Get <b>Fast, Free Shipping&nbsp;</b>with&nbsp;<a href="https://www.amazon.com/amazonprime?_encoding=UTF8&primeCampaignId=primedp_ventures_desktopBelowThreshold&ref=primedp_ventures_desktopBelowThreshold">Amazon Prime</a>&nbsp;&amp;&nbsp;<a href="https://www.amazon.com/b?node=18726306011">Free Returns</a></span></span><br></br>
       <span className="product-save">You Save:&nbsp;${this.props.save}&nbsp;&nbsp;{this.props.save_pct}%</span>
       <div>
         <br></br>
         <FormWidget forms={this.props.forms} />
       </div><br></br>
       <div>
         <SellerTable sellers={this.props.sellers} />
       </div>
      </div>
    )
  }
}

export default OverviewWidget;