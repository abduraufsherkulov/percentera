import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "reactstrap";

const localizer = BigCalendar.momentLocalizer(moment);

export class BorrowIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: +"",
      overall: +"",
      percentOfMoney: +"",
      overallMoney: +"",
      daily: +"",
      dailyPercent: +"",
      amount: +"",
      long: +"",
      ours: 2,
      given: "",
      divided: [],
      events: [],
      applied: false,
      rest_tempbalance: +"",
      err: {
        valid: "",
        message: "",
        validRate: "",
        messageRate: ""
      },
      amount_wanted: "",
      rate_wanted: "",
      restrict: "",
      isLoading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    const url = "https://hidden-oasis-96512.herokuapp.com/getUserCards";
    const maindata = JSON.stringify({
      user_id: localStorage.getItem("userId")
    });
    axios({
      method: "post",
      url: url,
      data: maindata,
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        //handle success
        this.setState({
          restrict: +response.data[0].balance * 0.2
        });
      })
      .catch(function(response) {
        //handle error
        console.log(response);
      });

    const endpoint = "https://hidden-oasis-96512.herokuapp.com/getBorrower";
    const mydata = JSON.stringify({
      id: this.props.match.params.id
    });
    axios({
      method: "post",
      url: endpoint,
      data: mydata,
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => {
        this.setState({
          amount: response.data[0].borrow_needed,
          long: response.data[0].borrow_dead_line,
          given: response.data[0].date,
          credit_type: response.data[0].credit_type,
          percent: +response.data[0].borrow_interest,
          rest_tempbalance:
            response.data[0].borrow_needed - response.data[0].tempbalance
        });

        //investor + percentera percentage
        let overall = +this.state.rate_wanted;
        //overall percent should be paid ex. overall + 600(PERCENT)
        let percentOfMoney = +this.state.amount_wanted * (overall / 100);
        //overall of money should be paid with percentage 5600
        let overallMoney = +this.state.amount_wanted + percentOfMoney;
        //daily should equal in money
        let daily = overallMoney / this.state.long;
        //daily should equal in percent
        let dailyPercent = overall / this.state.long;

        let i = 1;
        let myArr = [];

        for (i; i <= +this.state.long; i++) {
          let per = i * daily;
          per = per.toFixed(2);
          let add = moment(this.state.given).add(i, "day");
          let a = {
            start: new Date(add),
            end: new Date(moment(add).add(0, "day")),
            title: `${per} Sum`
          };

          myArr.push(a);
        }
        this.setState({
          events: myArr
        });

        this.setState({
          overall: overall,
          percentOfMoney: percentOfMoney,
          overallMoney: overallMoney,
          daily: daily,
          dailyPercent: dailyPercent,
          isLoading: false
        });
      })
      .catch(response => {
        console.log(response);
      });
  }

  handleChange = event => {
    this.props.onView(event.target.value);
  };
  componentDidUpdate(nextprops, nextstate) {
    if (nextstate.isLoading !== this.state.isLoading) {
      this.props.loadme(this.state.isLoading);
    }
    if (nextstate.amount_wanted !== this.state.amount_wanted) {
      //investor + percentera percentage
      let overall = +this.state.rate_wanted;
      //overall percent should be paid ex. overall + 600(PERCENT)
      let percentOfMoney = +this.state.amount_wanted * (overall / 100);
      //overall of money should be paid with percentage 5600
      let overallMoney = +this.state.amount_wanted + percentOfMoney;
      //daily should equal in money
      let daily = overallMoney / this.state.long;
      //daily should equal in percent
      let dailyPercent = overall / this.state.long;

      let i = 1;
      let myArr = [];

      for (i; i <= +this.state.long; i++) {
        let per = i * daily;
        per = per.toFixed(2);
        let add = moment(this.state.given).add(i, "day");
        let a = {
          start: new Date(add),
          end: new Date(moment(add).add(0, "day")),
          title: `${per} Sum`
        };

        myArr.push(a);
      }
      this.setState({
        events: myArr
      });

      this.setState({
        overall: overall,
        percentOfMoney: percentOfMoney,
        overallMoney: overallMoney,
        daily: daily,
        dailyPercent: dailyPercent
      });
    } else if (nextstate.rate_wanted !== this.state.rate_wanted) {
      //investor + percentera percentage
      let overall = +this.state.rate_wanted;
      //overall percent should be paid ex. overall + 600(PERCENT)
      let percentOfMoney = +this.state.amount_wanted * (overall / 100);
      //overall of money should be paid with percentage 5600
      let overallMoney = +this.state.amount_wanted + percentOfMoney;
      //daily should equal in money
      let daily = overallMoney / this.state.long;
      //daily should equal in percent
      let dailyPercent = overall / this.state.long;

      let i = 1;
      let myArr = [];

      for (i; i <= +this.state.long; i++) {
        let per = i * daily;
        per = per.toFixed(2);
        let add = moment(this.state.given).add(i, "day");
        let a = {
          start: new Date(add),
          end: new Date(moment(add).add(0, "day")),
          title: `${per} Sum`
        };

        myArr.push(a);
      }
      this.setState({
        events: myArr
      });

      this.setState({
        overall: overall,
        percentOfMoney: percentOfMoney,
        overallMoney: overallMoney,
        daily: daily,
        dailyPercent: dailyPercent
      });
    }
  }
  handleValueChange = event => {
    if (event.target.name === "amount_wanted") {
      let main_rest = Math.min(
        this.state.restrict,
        this.state.rest_tempbalance
      );
      if (main_rest < event.target.value) {
        this.setState({
          amount_wanted: event.target.value,
          err: {
            valid: false,
            message: `You can only invest less than ${main_rest}`
          }
        });
      } else {
        this.setState({
          amount_wanted: event.target.value,
          err: {
            valid: true,
            message: `It is valid investment`
          }
        });
      }
    } else if (event.target.name === "rate_wanted") {
      let main_rate = event.target.value;
      let higher = +this.state.percent + 10;
      if (event.target.value > higher) {
        this.setState({
          rate_wanted: event.target.value,
          err: {
            validRate: false,
            messageRate: `Are you sure you want to receive ${main_rate}%? Preferred rate is ${
              this.state.percent
            }%`
          }
        });
      } else if (event.target.value < higher) {
        this.setState({
          rate_wanted: event.target.value,
          err: {
            validRate: true
          }
        });
      } else {
        this.setState({
          rate_wanted: event.target.value,
          err: {
            validRate: true
          }
        });
      }
    }
  };
  handleRateChange = event => {
    this.setState({
      rate_wanted: event.target.value
    });
  };
  handleSubmit(event) {
    this.setState({
      isLoading: true
    });
    const { history } = this.props;
    const endpoint = "https://hidden-oasis-96512.herokuapp.com/checkBid";
    const lastpoint = "https://hidden-oasis-96512.herokuapp.com/addPull";
    const mydata = JSON.stringify({
      borrow_id: this.props.match.params.id,
      investor_user_id: localStorage.getItem("userId")
    });
    const lastdata = JSON.stringify({
      borrow_id: this.props.match.params.id,
      investor_user_id: localStorage.getItem("userId"),
      amount: this.state.amount_wanted,
      rate: this.state.rate_wanted
    });
    axios({
      method: "post",
      url: endpoint,
      data: mydata,
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        if (response.data === false) {
          axios({
            method: "post",
            url: lastpoint,
            data: lastdata,
            headers: { "Content-Type": "application/json" }
          })
            .then(res => {
              if (res.data === true) {
                this.setState(
                  {
                    applied: true,
                    isLoading: false
                  },
                  () => {
                    setTimeout(function() {
                      history.push("/myinvestments");
                    }, 3000);
                  }
                );
              } else {
                console.log("something wrong");
              }
            })
            .catch(res => {
              console.log(res);
            });
        } else {
          console.log("wrong");
        }
      })
      .catch(response => {
        console.log(response);
      });
    event.preventDefault();
  }
  render() {
    let amountClass = "form-control ";
    amountClass += this.state.err.valid === false ? "is-invalid" : "";
    let rateClass = "form-control ";
    rateClass += this.state.err.validRate === false ? "is-invalid" : "";
    let myValidation;
    if (this.state.err.valid === "" || this.state.amount_wanted.length === 0) {
      myValidation = true;
    } else if (this.state.err.valid === true) {
      myValidation = false;
    } else if (this.state.err.valid === false) {
      myValidation = true;
    }
    let alertme =
      this.state.applied === false ? (
        ""
      ) : (
        <Alert style={{ margin: "0 auto" }} color="yellow w-50 text-center">
          You have successfully applied for credit
        </Alert>
      );
    var listItems = (
      <React.Fragment>
        <div className="col-4">
          <div>
            <label>Overall Percent</label>
            <p>{this.state.overall}%</p>
          </div>
          <div>
            <label>Percent with overall investment</label>
            <p className="down-p">{this.state.overallMoney} Sum</p>
          </div>
        </div>
        <div className="col-4">
          <div>
            <label>Daily Amount Will Be Received</label>
            <p>{this.state.daily} Sum</p>
          </div>
          <div>
            <label>Overall amount needed</label>
            <p className="down-p">{this.state.rest_tempbalance} Sum</p>
          </div>
        </div>
        <div className="col-4">
          <div>
            <label>Daily Percentage</label>
            <p>{this.state.dailyPercent}%</p>
          </div>
          <div>
            <label>Preferred percent by borrower</label>
            <p className="down-p">{this.state.percent}%</p>
          </div>
        </div>
      </React.Fragment>
    );

    const toolbar = props => {
      const { onNavigate, label } = props;
      return (
        <div className="rbc-toolbar">
          {/* <button type="button" onClick={() => onNavigate("TODAY")}>
              today
            </button> */}
          <span>
            <FontAwesomeIcon
              icon="caret-left"
              style={{ cursor: "pointer" }}
              className="text-white ml-3"
              onClick={() => onNavigate("PREV")}
            />
          </span>
          <span className="rbc-toolbar-label">{label}</span>
          <span>
            <FontAwesomeIcon
              icon="caret-right"
              style={{ cursor: "pointer" }}
              onClick={() => onNavigate("NEXT")}
              className="text-white mr-3"
            />
          </span>
        </div>
      );
    };
    const dateHeader = props => {
      const { label } = props;
      return <span>{label}</span>;
    };
    return (
      <section id="borrowin" className="coverUp">
        <div className="container">
          {alertme}
          <div className="row">
            <h1 className="w-100 text-center mb-3 big-h1">Statistics</h1>
            <form
              onSubmit={this.handleSubmit}
              className="col-md-10 offset-md-1 col bg-white px-4 py-4"
            >
              <div className="row">
                <div className="col-6">
                  <div>
                    <label className="pt-2" htmlFor="amount_wanted">
                      Amount of money you want to invest{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      onChange={this.handleValueChange}
                      name="amount_wanted"
                      type="number"
                      className={amountClass}
                      id="amount_wanted"
                      placeholder="100000"
                      value={this.state.amount_wanted}
                      max={this.state.restrict}
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      {this.state.err.message}
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div>
                    <label className="pt-2" htmlFor="rate_wanted">
                      Amount of rate you want to receive{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      onChange={this.handleValueChange}
                      name="rate_wanted"
                      type="number"
                      className={rateClass}
                      id="rate_wanted"
                      placeholder="22"
                      value={this.state.rate_wanted}
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      {this.state.err.messageRate}
                    </div>
                  </div>
                </div>
                {listItems}
              </div>
              <button
                className="btn btn-yellow float-right"
                disabled={myValidation}
              >
                Apply
              </button>
            </form>
            <div className="col-md-10 offset-md-1 col bg-white mb-5">
              <div className="row">
                <div className="w-100 listborder">
                  <BigCalendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="month"
                    components={{
                      toolbar: toolbar,
                      month: { dateHeader: dateHeader }
                    }}
                    events={this.state.events}
                    style={{ height: "55vh", width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
