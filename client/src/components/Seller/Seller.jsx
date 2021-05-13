const moment = require('moment');
const React = require('react');
const Seller = ({seller}) => (
  <tr>
    <td ><span>{seller.form}</span><br></br><span>{moment(seller.release_date).format("MMMM D, YYYY")}</span></td>
    <td className="a-size-small">{seller.edition}</td>
    <td className="a-size-small">{seller.discs}</td>
    <td className="a-size-small a-color-price">${seller.price}</td>
    <td className="a-size-small a-color-new">${seller.newfrom}</td>
    <td className="a-size-small a-color-used">${seller.usedfrom}</td>
    <td></td>
  </tr>
)

export default Seller;