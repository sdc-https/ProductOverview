function Stock({in_stock}) {
  if (in_stock) {
    return <span><b>In Stock.</b></span>
  } else {
    return <span><b>Out of Stock.</b></span>
  }
}

export default Stock;