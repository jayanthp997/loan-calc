import React, { Component } from 'react';
import './App.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
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
      interestRate: 0,
      noOfMonths: 6,
      monthlyPaymentAmount: 0,
      currency: 'USD',
      numPayments: 0,
      principalAmount: 0
    }
    this.getInterest = this.getInterest.bind(this);
  }

  viewToolTipValue(v) {
    return '${v}';
  }

  componentDidMount() {
    this.getInterest(this.state.minNoOfMonths, this.state.amount);
  }

  getInterest(numMonths, amount) {
    fetch(`https://ftl-frontend-test.herokuapp.com/interest?amount=${amount}&numMonths=${numMonths}`)
      .then((result => result.json()))
      .then(data => data)
      .then(response => {
        console.log("response", response);

        this.setState({
          interestRate: response.interestRate,
          monthlyPaymentAmount: response.monthlyPayment.amount,
          currency: response.monthlyPayment.currency,
          numPayments: response.numPayments,
          principalAmount: response.principal.amount
        })
      })
      .catch(error => console.error(error))
      this.setState({noOfMonths: numMonths, amount: amount})
  }

  render() {
    return (
      <div className="mainview">
        <div className="container">

          <div className="col-md-8 slider marcenter">
            <h4 className=""> Loan Amount <span class="totalamtdis">{this.state.amount} &#36;</span></h4>
            <Slider
              min={this.state.minAmount}
              max={this.state.maxAmount}
              defaultValue={this.state.minAmount}

              tipFormatter={value =>'${value}%'}

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
              placeholder={"No of Months (default 6 months)"} min={this.state.minNoOfMonths} max={this.state.maxNoOfMonths}
               onChange={(e) => {
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
                  {this.state.interestRate}%
    </h2>

              </div>
              <div className="col-md-6">
                <h4>
                  Monthly Payment
    </h4>
                <h2>
                  {this.state.monthlyPaymentAmount} USD
    </h2>

              </div>
              <div className="col-md-6 padtop20" >
                <h4>
                  Number Of Payments
    </h4>
                <h2>
                  {this.state.numPayments} No's
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