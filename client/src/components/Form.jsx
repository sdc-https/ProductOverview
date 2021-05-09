const Form = ({form, price}) => (
  <div className="col">
    <span>{form}</span><br></br>
    <span>${price}</span>
  </div>
)

export default Form;