import Seller from './Seller.jsx';

const SellerTable = ({sellers}) => (
  <div>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Additional DVD Options</th>
          <th scope="col">Edition</th>
          <th scope="col">Discs</th>
          <th scope="col">Price</th>
          <th scope="col">New from</th>
          <th scope="col">Used from</th>
        </tr>
      </thead>
      <tbody>
        {sellers.map((seller, idx) => <Seller key={seller.seller_id} seller={seller}/>)}
      </tbody>
    </table>
</div>
)

export default SellerTable;