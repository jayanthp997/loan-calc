import React, { Component } from 'react';
import './App.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
  // const createSliderWithTooltip = Slider.createSliderWithTooltip;

const Handle = Slider.Handle;
const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index} >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};


class App extends Component {
  constructor() {
    super();
    this.state = {
      minAmount: 500,
      maxAmount: 5000,
      minNoOfMonths: 6,
      maxNoOfMonths: 24,

      amount: 500,

    }
    this.getInterest = this.getInterest.bind(this);
  }


viewToolTipValue(v) {
  return '${v}';
}

  componentDidMount() {
    this.getInterest(this.state.noOfMonths, this.state.amount);
  }

  getInterest(numMonths, amount) {
    fetch('https://ftl-frontend-test.herokuapp.com/interest?amount=560&numMonths=7')
    .then((result) => {
      console.log("result", result);
    }).catch((err) => {
      console.error(err);
    });
    console.log(numMonths, amount);
    this.setState({ noOfMonths: numMonths, amount: amount });
  }

  render() {
    return (
      <div className="mainview">
      <div className="container">

          <div className="col-md-8 slider marcenter">
<h4 className=""> Loan Amount <span className="totalamtdis">{this.state.amount} &#36;</span></h4>
               <Slider 
            min={this.state.minAmount}
            max={this.state.maxAmount}
            defaultValue={this.state.minAmount}

tipFormatter={value => '${value}%'}
      
handle={handle}
            onAfterChange={(e) => {
              this.getInterest(this.state.noOfMonths, e);
            }}
          >
          </Slider>
     
        </div>
        <div className="col-md-8  marcenter">
<h4 className=""> Enter Loan Duration</h4>
     

          <input type="number" className="form-control" 
          placeholder = {"No of Months"} min={this.state.minNoOfMonths} max={this.state.maxNoOfMonths} 
          value={this.state.noOfMonths} onChange={(e) => {
            if (e.target.value >= this.state.minNoOfMonths && this.state.amount >= this.state.minAmount) {
              this.getInterest(e.target.value, this.state.amount);
            }
          }}>
          </input>
        </div>


<div className="col-md-8 marcenter">
  <div className="row">
<div className="col-md-6">


    <h4>
      Interest Rate
    </h4>
    <h2>
      12 %
    </h2>

  </div>
  <div className="col-md-6">


    <h4>
      Monthly Payment
    </h4>
    <h2>
       98 USD
    </h2>

  </div>
  </div>
</div>










        </div>
      </div>
    );
  }
}

export default App;