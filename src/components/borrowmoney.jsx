import React, { Component } from "react";
//import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Tooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Alert } from "reactstrap";
library.add(faInfoCircle);

export class BorrowMoney extends Component {
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
      borrow_needed: "",
      borrow_dead_line: "",
      borrow_interest: "",
      borrow_why: "",
      added: false,
      selectedOption: "",
      first_name: "",
      last_name: "",
      credit_type: "",
      income: "",
      isLoading: "",
      given: "",
      rating: "",
      reserved: "",
      possible: ""
    };
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    });
    const getRating = "https://hidden-oasis-96512.herokuapp.com/getRating";
    const getData = JSON.stringify({
      user_id: localStorage.getItem("userId")
    });

    axios({
      method: "post",
      url: getRating,
      data: getData,
      headers: { "content-type": "application/json" }
    })
      .then(response => {
        console.log(response);
        this.setState({
          given: response.data[0].given,
          rating: response.data[0].given,
          reserved: response.data[0].reserved,
          possible: +response.data[0].reserved - +response.data[0].given
        });
      })
      .catch(response => {
        console.log(response);
      });

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
          income: response.data.income,
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
  componentDidUpdate(prop, state) {
    if (this.state.isLoading !== state.isLoading)
      this.props.loadme(this.state.isLoading);
  }
  handleSubmit(event) {
    this.setState({
      isLoading: true
    });
    const givenUrl = "https://hidden-oasis-96512.herokuapp.com/updateGiven";
    const givenData = JSON.stringify({
      user_id: this.state.user_id,
      given: this.state.borrow_needed
    });
    axios({
      method: "post",
      url: givenUrl,
      data: givenData,
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(response => {
        console.log(response);
      });

    const { history } = this.props;
    const endpoint = "https://hidden-oasis-96512.herokuapp.com/borrowerAdd";
    const mydata = JSON.stringify({
      user_id: this.state.user_id,
      credit_type: this.state.credit_type,
      last_name: this.state.last_name,
      first_name: this.state.first_name,
      borrow_needed: this.state.borrow_needed,
      borrow_dead_line: this.state.borrow_dead_line,
      borrow_interest: this.state.borrow_interest,
      borrow_why: this.state.selectedOption,
      date: this.state.startDate
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
            added: true
          },
          () => {
            window.scrollTo(0, 0);
            this.setState({
              isLoading: false
            });
            setTimeout(function() {
              history.push("/borrowerlist");
            }, 3000);
          }
        );
      })
      .catch(response => {
        console.log(response);
      });
    event.preventDefault();
  }
  render() {
    let amount_class = "form-control ";
    if (this.state.borrow_needed > this.state.possible) {
      amount_class += "is-invalid";
    } else {
      amount_class += "";
    }
    let alertme =
      this.state.added === false ? (
        ""
      ) : (
        <Alert style={{ margin: "0 auto" }} color="yellow w-50 text-center">
          You have successfully applied to borrow
        </Alert>
      );
    console.log(this.state.possible);
    return (
      <section id="borrowmoney" className="coverUp">
        <div className="container">
          {alertme}
          <div className="row">
            <h1 className="w-100 text-center mb-3 big-h1">Borrow Money</h1>
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
                    <label htmlFor="borrow_needed">
                      Amount of money you need
                    </label>
                    <input
                      onChange={this.handleChange}
                      name="borrow_needed"
                      type="number"
                      className={amount_class}
                      id="borrow_needed"
                      placeholder="1 000 000 etc."
                      required
                      max={this.state.possible}
                    />
                    <div className="valid-feedback">It is okay</div>
                    <div className="invalid-feedback">
                      Your rating is{" "}
                      <span className="badge badge-danger">
                        {localStorage.getItem("rating")}
                      </span>
                      . Maximum amount you can borrow is {this.state.possible}
                    </div>
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
                      name="borrow_dead_line"
                      type="number"
                      className="form-control"
                      id="borrow_dead_line"
                      placeholder="100 etc."
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Looks bad!</div>
                  </div>
                  <div>
                    <label htmlFor="borrow_interest">Preferred Interest</label>
                    <input
                      onChange={this.handleChange}
                      name="borrow_interest"
                      type="number"
                      className="form-control"
                      id="borrow_interest"
                      placeholder="20 etc"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Looks bad!</div>
                  </div>
                  <div>
                    <label htmlFor="borrow_why">
                      Purpose of borrow
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
                            name="borrow_why"
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
                            name="borrow_why"
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
                            name="borrow_why"
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
                            name="borrow_why"
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
                            name="borrow_why"
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
                            name="borrow_why"
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
                  <div>
                    <label>Pool end date</label>
                    <DatePicker
                      selected={this.state.startDate}
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

export default BorrowMoney;
