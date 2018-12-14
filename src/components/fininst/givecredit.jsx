import React, { Component } from "react";
//import NumberFormat from "react-number-format";
//import DatePicker from "react-datepicker";
import moment from "moment";
import { Tooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Alert } from "reactstrap";
library.add(faInfoCircle);

export class GiveCredit extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleSlide = this.handleSlide.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      slide: 0,
      tooltipOpen: false,
      startDate: moment(),
      user_id: localStorage.getItem("userId"),
      added: false,
      selectedOption: "",
      income: "",
      interest_type: "",
      bank_name: "",
      credit_amount: "",
      credit_long: "",
      credit_interest: "",
      isLoading: false
    };
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    });
    const url = "https://hidden-oasis-96512.herokuapp.com/getBankProfile";
    const mydata = JSON.stringify({
      user_id: localStorage.getItem("userId")
    });
    axios({
      method: "post",
      url: url,
      data: mydata,
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => {
        console.log(response);
        this.setState({
          bank_name: response.data[0].bank_name,
          isLoading: false
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  handleDateChange(date) {
    this.setState({
      startDate: date
    });
  }
  handleSlide(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleOptionChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  handleSubmit(event) {
    this.setState({
      isLoading: true
    });
    const { history } = this.props;
    const endpoint = "https://hidden-oasis-96512.herokuapp.com/creditBankAdd";
    const mydata = JSON.stringify({
      user_id: this.state.user_id,
      interest_type: this.state.interest_type,
      bank_name: this.state.bank_name,
      credit_amount: this.state.credit_amount,
      credit_long: this.state.credit_long,
      credit_interest: this.state.credit_interest,
      credit_purpose: this.state.selectedOption
    });
    axios({
      method: "post",
      url: endpoint,
      data: mydata,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        this.setState(
          {
            added: true,
            isLoading: false
          },
          () => {
            window.scrollTo(0, 0);
            setTimeout(function() {
              history.push("/listofcredits");
            }, 3000);
          }
        );
      })
      .catch(response => {
        console.log(response);
      });
    event.preventDefault();
  }
  componentDidUpdate(prop, state) {
    if (state.isLoading !== this.state.isLoading) {
      this.props.loadme(this.state.isLoading);
    }
  }
  render() {
    console.log(this.state.bank_name);
    let amount_class = "form-control ";
    if (this.state.borrow_needed > this.state.income) {
      amount_class += "is-invalid";
    } else {
      amount_class += "";
    }
    let alertme =
      this.state.added === false ? (
        ""
      ) : (
        <Alert style={{ margin: "0 auto" }} color="yellow w-50 text-center">
          You have successfully posted!
        </Alert>
      );
    return (
      <section id="borrowmoney" className="coverUp">
        <div className="container">
          {alertme}
          <div className="row">
            <h1 className="w-100 text-center mb-3 big-h1">Give Credit</h1>
            <form
              onSubmit={this.handleSubmit}
              className="col-md-8 offset-md-2 col bg-white mb-5 pb-3"
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
                    <label htmlFor="credit_amount">
                      Amount of credit you want to give
                    </label>
                    <input
                      onChange={this.handleChange}
                      name="credit_amount"
                      type="number"
                      className={amount_class}
                      id="credit_amount"
                      placeholder="1 000 000 etc."
                      required
                      //max={this.state.income}
                    />
                    <div className="valid-feedback">It is okay</div>
                    <div className="invalid-feedback">
                      Your income does not allow to get such amount of credit
                    </div>
                  </div>
                  <div className="my-3 d-flex align-items-center justify-content-between">
                    <label>Preferred type</label>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        id="radio_1"
                        name="interest_type"
                        onChange={this.handleChange}
                        className="custom-control-input"
                        value="Daily"
                      />
                      <label className="custom-control-label" htmlFor="radio_1">
                        Daily
                      </label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        id="radio_2"
                        name="interest_type"
                        onChange={this.handleChange}
                        className="custom-control-input"
                        value="Monthly"
                      />
                      <label className="custom-control-label" htmlFor="radio_2">
                        Monthly
                      </label>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="credit_long">Time range</label>
                    <input
                      onChange={this.handleChange}
                      name="credit_long"
                      type="number"
                      className="form-control"
                      id="credit_long"
                      placeholder="100 etc."
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Looks bad!</div>
                  </div>
                  <div>
                    <label htmlFor="credit_interest">Preferred Interest</label>
                    <input
                      onChange={this.handleChange}
                      name="credit_interest"
                      type="number"
                      className="form-control"
                      id="credit_interest"
                      placeholder="20 etc"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Looks bad!</div>
                  </div>
                  <div>
                    <label htmlFor="borrow_why">
                      Purpose of credit
                      <span id="DisabledAutoHideExample" className="ml-2">
                        <FontAwesomeIcon icon="info-circle" />
                      </span>
                    </label>
                    <Tooltip
                      placement="right"
                      isOpen={this.state.tooltipOpen}
                      autohide={false}
                      target="DisabledAutoHideExample"
                      toggle={this.toggle}
                    >
                      This field is optional
                    </Tooltip>
                    <div className="d-flex justify-content-between">
                      <div>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="purpose_1"
                            name="credit_purpose"
                            className="custom-control-input"
                            value="Education"
                            checked={this.state.selectedOption === "Education"}
                            onChange={this.handleOptionChange}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="purpose_1"
                          >
                            Education
                          </label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input
                            value="Business"
                            checked={this.state.selectedOption === "Business"}
                            onChange={this.handleOptionChange}
                            type="radio"
                            id="purpose_2"
                            name="credit_purpose"
                            className="custom-control-input"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="purpose_2"
                          >
                            Business
                          </label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input
                            value="Home Buying"
                            checked={
                              this.state.selectedOption === "Home Buying"
                            }
                            onChange={this.handleOptionChange}
                            type="radio"
                            id="purpose_3"
                            name="credit_purpose"
                            className="custom-control-input"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="purpose_3"
                          >
                            Home Buying
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="custom-control custom-radio">
                          <input
                            value="Major purchase"
                            checked={
                              this.state.selectedOption === "Major purchase"
                            }
                            onChange={this.handleOptionChange}
                            type="radio"
                            id="purpose_4"
                            name="credit_purpose"
                            className="custom-control-input"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="purpose_4"
                          >
                            Major purchase
                          </label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input
                            value="Medical expenses"
                            checked={
                              this.state.selectedOption === "Medical expenses"
                            }
                            onChange={this.handleOptionChange}
                            type="radio"
                            id="purpose_5"
                            name="credit_purpose"
                            className="custom-control-input"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="purpose_5"
                          >
                            Medical expenses
                          </label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input
                            value="Car financing"
                            checked={
                              this.state.selectedOption === "Car financing"
                            }
                            onChange={this.handleOptionChange}
                            type="radio"
                            id="purpose_6"
                            name="credit_purpose"
                            className="custom-control-input"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="purpose_6"
                          >
                            Car financing
                          </label>
                        </div>
                      </div>
                    </div>
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
