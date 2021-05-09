function Stock({in_stock}) {
  if (in_stock) {
    return <span className="instock"><b>In Stock.</b></span>
  } else {
    return <span className="outofstock"><b>Out of Stock.</b></span>
  }
}

export default Stock;