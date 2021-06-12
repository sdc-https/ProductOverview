import Form from './Form.jsx';
// const React = require('react');

const FormWidget = ({forms}) => (
  <div className="container">
    <div className="row">
      {forms.map((item, idx) => <Form key={idx} form={item.form} price={item.price}/>)}
    </div>
  </div>
)

export default FormWidget;