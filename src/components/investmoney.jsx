import React, { Component } from "react";
//import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";
import moment from "moment";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Alert } from "reactstrap";

library.add(faInfoCircle);

export class InvestMoney extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    //this.handleSlide = this.handleSlide.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      slide: 0,
      tooltipOpen: false,
      dateName: moment(),
      user_id: localStorage.getItem("userId"),
      invest_amount: "",
      invest_long: "",
      invest_interest: "",
      added: false,
      last_name: "",
      first_name: "",
      credit_type: ""
    };
  }
  componentDidMount() {
    const url = `http://mycontract.uz/frontend/web/profile/get?id=${localStorage.getItem(
      "userId"
    )}`;
    axios({
      method: "post",
      url: url,
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => {
        console.log(response);
        this.setState({
          first_name: response.data.first_name,
          last_name: response.data.surname,
          income: response.data.income
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  handleSubmit(event) {
    const { history } = this.props;
    const thislink = "https://hidden-oasis-96512.herokuapp.com/investorAdd";
    const thisdata = JSON.stringify({
      user_id: this.state.user_id,
      invest_amount: this.state.invest_amount,
      invest_long: this.state.invest_long,
      invest_interest: this.state.invest_interest,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      credit_type: this.state.credit_type
    });
    console.log(thisdata);
    axios({
      method: "post",
      url: thislink,
      data: thisdata,
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        console.log(response);
        this.setState(
          {
            added: true
          },
          () => {
            setTimeout(function() {
              history.push("/investmoney");
            }, 3000);
          }
        );
      })
      .catch(response => {
        console.log(response);
      });

    event.preventDefault();
  }

  handleDateChange(dateField) {
    this.setState({
      dateName: dateField
    });
  }
  render() {
    let alertme =
      this.state.added === false ? (
        ""
      ) : (
        <Alert style={{ margin: "0 auto" }} color="yellow w-50 text-center">
          You have successfully applied to borrow
        </Alert>
      );
    return (
      <section id="investmoney" className="coverUp">
        <div className="container">
          {alertme}
          <div className="row">
            <h1 className="w-100 text-center mb-3 big-h1">Invest Money</h1>
            <form
              onSubmit={this.handleSubmit}
              className="col-md-8 offset-md-2 col bg-white"
            >
              <div className="col-md-10 offset-md-1">
                <div className="form-group mt-5">
                  {/* <div>
                  <div style={{ width: "95%" }}>
                    <span
                      style={{
                        left: `${this.state.slide}%`,
                        position: "relative"
                      }}
                    >
                      {this.state.slide}
                    </span>
                  </div>
                  <input
                    onChange={this.handleSlide}
                    name="slide"
                    type="range"
                    className="custom-range"
                    id="customRange1"
                    value={this.state.slide}
                  />
                </div> */}
                  <div>
                    <label htmlFor="invest_amount">
                      Amount of money you want to invest
                    </label>
                    <input
                      onChange={this.handleChange}
                      name="invest_amount"
                      type="number"
                      className="form-control"
                      id="invest_amount"
                      placeholder="1 000 000 etc."
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Looks bad!</div>
                  </div>
                  <div className="my-3 d-flex align-items-center justify-content-between">
                    <label>Preferred type</label>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        id="radio_1"
                        name="credit_type"
                        onChange={this.handleChange}
                        className="custom-control-input"
                        value="daily"
                        required
                      />
                      <label className="custom-control-label" htmlFor="radio_1">
                        Daily
                      </label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        id="radio_2"
                        name="credit_type"
                        onChange={this.handleChange}
                        className="custom-control-input"
                        value="monthly"
                        required
                      />
                      <label className="custom-control-label" htmlFor="radio_2">
                        Monthly
                      </label>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="borrow_dead_line">Time range</label>
                    <input
                      onChange={this.handleChange}
                      name="invest_long"
                      type="number"
                      className="form-control"
                      id="invest_long"
                      placeholder="100 etc."
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Looks bad!</div>
                  </div>
                  <div>
                    <label htmlFor="invest_interest">Preferred Interest</label>
                    <input
                      onChange={this.handleChange}
                      name="invest_interest"
                      type="number"
                      className="form-control"
                      id="invest_interest"
                      placeholder="20 etc"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Looks bad!</div>
                  </div>
                  <div>
                    <label>Post destruction date</label>
                    <DatePicker
                      selected={this.state.dateName}
                      onChange={this.handleDateChange}
                      isClearable={true}
                      placeholderText="Please choose the date"
                      className="form-control"
                    />
                  </div>
                  <button className="btn btn-yellow w-100 mt-5 big-btn">
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default InvestMoney;
