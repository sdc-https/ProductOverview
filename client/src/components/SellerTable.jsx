import Seller from './Seller.jsx';

const SellerTable = ({sellers}) => (
  <div>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Additional DVD Options</th>
          <th className="col-name" scope="col">Edition</th>
          <th className="col-name" scope="col">Discs</th>
          <th className="col-name" scope="col">Price</th>
          <th className="col-name" scope="col">New from</th>
          <th className="col-name" scope="col">Used from</th>
        </tr>
      </thead>
      <tbody>
        {sellers.map((seller, idx) => <Seller key={seller.seller_id} seller={seller}/>)}
      </tbody>
    </table>
</div>
)

export default SellerTable;