import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import SellerTable from '../client/src/components/Seller/SellerTable';
import PropTypes from 'prop-types';

Enzyme.configure({ adapter: new Adapter() });


it ('renders a table without crashing', () => {
  const testItems = [{
    "_id": "60a6b33b19f263a535cd5b49",
    "seller_id": "7f5a5590-b99e-11eb-953d-0b926af84c7e",
    "discs": 29,
    "price": 342,
    "newfrom": 83,
    "usedfrom": 736,
    "edition": "Limited Collector's Edition",
    "form": "DVD",
    "release_date": "2021-01-19T06:34:06.969Z"
  }];

  const wrapper = shallow(<SellerTable sellers={testItems}/>);
  console.log(wrapper.props());
})