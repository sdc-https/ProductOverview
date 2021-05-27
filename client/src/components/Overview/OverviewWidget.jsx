import SellerTable from '../Seller/SellerTable.jsx';
import FormWidget from '../Form/FormWidget.jsx';
const React = require('react');

class OverviewWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="overview">
       <span className="product-name"><b>{this.props.product_name}</b></span><br></br>
       <span className="product-package"><b>{this.props.package_name}</b></span><br></br>
       <span className="cast">
         <a className="a-link-normal">Various</a>
         <span className="a-color-secondary"> &#40;{this.props.actor1}, {this.props.actor2}&#41;</span>
         <i className="a-icon a-icon-text-separator" role="presentation"></i>
         <span className="a-color-secondary">Rated:</span>
         <span className="product-cast-rating"> {this.props.rating}</span>
         <i className="a-icon a-icon-text-separator" role="presentation"></i>
         <span className="a-color-secondary">Format:</span>
         <span className="product-cast-form"> DVD</span>
      </span><br></br>
      <span className="a-icon-all">{this.props.average} out of 5 stars</span><span className="rating">&nbsp;&nbsp;{this.props.reviewcount} ratings</span><br></br>
       <span className="a-color-secondary">List Price:&nbsp;<strike className="product-listprice">${this.props.list_price}</strike></span>
       <a className="a-link-normal" href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GQ6B6RH72AX8D2TD&ref_=dp_hp">&nbsp;&nbsp;Details</a><br></br>
       <span className="a-color-secondary">Price:&nbsp;</span>
       <span className="product-price">${this.props.price}</span>
       <span>&nbsp;Get&nbsp;<b>Fast, FREE Shipping&nbsp;</b>with&nbsp;</span>
       <a className="a-link-normal" href="https://www.amazon.com/amazonprime?_encoding=UTF8&primeCampaignId=primedp_ventures_desktopBelowThreshold&ref=primedp_ventures_desktopBelowThreshold">Amazon Prime</a>
       <span>&nbsp;&amp;</span>
       <a className="a-link-normal" href="https://www.amazon.com/b?node=18726306011">&nbsp;Free Returns</a><br></br>
       <span className="a-color-secondary">You Save:&nbsp;</span>
       <span className="product-save">${this.props.save}&nbsp;&nbsp;&#40;{this.props.save_pct}%&#41;</span><br></br>
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