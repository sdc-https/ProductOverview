class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="overview">
       <h1>Product Overview</h1>
      </div>
    )
  }
}

ReactDOM.render(<Overview />, document.getElementById("root"));