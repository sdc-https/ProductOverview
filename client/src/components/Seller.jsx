const moment = require('moment');
const Seller = ({seller}) => (
  <tr>
    <td><span>{seller.form}</span><br></br><span>{moment(seller.release_date).format("MMMM Do YYYY")}</span></td>
    <td>{seller.edition}</td>
    <td>{seller.discs}</td>
    <td>${seller.price}</td>
    <td>${seller.newfrom}</td>
    <td>${seller.usedfrom}</td>
    <td></td>
  </tr>
)

export default Seller;