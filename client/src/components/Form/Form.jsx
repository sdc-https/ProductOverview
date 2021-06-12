// const React = require('react');

const Form = ({form, price}) => (
  <div className="col">
    <span className="a-size-small">{form}</span><br></br>
    <span className="a-size-small">${price}</span>
  </div>
)

export default Form;