import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "reactstrap";

const localizer = BigCalendar.momentLocalizer(moment);

export class InvestInStat extends Component {
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
      validness: true,
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
      payback: [],
      percenteraInitial: 2,
      percenteraFee: "",
      rightAway: +"",
      isLoading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    const pullUrl = "https://hidden-oasis-96512.herokuapp.com/getPull";
    const pullData = JSON.stringify({
      pull_id: this.props.match.params.id
    });
    axios({
      method: "post",
      url: pullUrl,
      data: pullData,
      headers: { "content-type": "application/json" }
    })
      .then(response => {
        this.setState({
          amount_wanted: +response.data[0].amount,
          rate_wanted: +response.data[0].rate
        });
      })
      .catch(response => {
        console.log(response);
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
          restrict: +response.data[0].balance
        });
      })
      .catch(function(response) {
        //handle error
        console.log(response);
      });

    const endpoint = "https://hidden-oasis-96512.herokuapp.com/getBorrower";
    const mydata = JSON.stringify({
      id: this.props.match.params.borrow_id
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
        let overall = this.state.percenteraInitial + +this.state.rate_wanted;
        //overall percent should be paid ex. overall + 600(PERCENT)
        let percentOfMoney = +this.state.amount_wanted * (overall / 100);
        //overall of money should be paid with percentage 5600
        let overallMoney = +this.state.amount_wanted + percentOfMoney;
        //daily should equal in money
        let daily = percentOfMoney / this.state.long;
        //daily should equal in percent
        let dailyPercent = +this.state.rate_wanted / this.state.long;
        let percenteraFee = this.state.percenteraInitial / +this.state.long;

        let i = 1;
        let myArr = [];

        for (i; i <= +this.state.long; i++) {
          let per = this.state.amount_wanted + i * daily;
          per = per.toFixed(2);
          let add = moment(this.state.given).add(i, "day");
          let a = {
            start: new Date(add),
            end: new Date(moment(add).add(0, "day")),
            title: `${per} Sum`
          };
          let thisDay = new Date(moment());
          if (
            moment(a.start).format("DD/MM/YYYY") ===
            moment(thisDay).format("DD/MM/YYYY")
          ) {
            this.setState({
              rightAway: +per
            });
          }
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
          percenteraFee: percenteraFee,
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
    let calc_percent = this.state.rightAway - this.state.amount_wanted;
    let calc_investor =
      calc_percent * (this.state.rate_wanted / this.state.overall);
    let company_profit =
      calc_percent * (this.state.percenteraInitial / this.state.overall);
    let investor_amount = this.state.amount_wanted + calc_investor;

    const { history } = this.props;
    const endpoint = "https://hidden-oasis-96512.herokuapp.com/payBack";

    const mydata = JSON.stringify({
      pull_id: this.props.match.params.id,
      user_id: localStorage.getItem("userId"),
      investor_amount: investor_amount,
      company_profit: company_profit
    });
    if (this.state.restrict > this.state.rightAway) {
      axios({
        method: "post",
        url: endpoint,
        data: mydata,
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          console.log(response);
          this.setState(
            {
              applied: true,
              isLoading: false
            },
            () => {
              setTimeout(function() {
                history.goBack();
              }, 3000);
            }
          );
        })
        .catch(response => {
          console.log(response);
        });
      event.preventDefault();
    } else {
      this.setState(
        {
          validness: false,
          isLoading: false
        },
        () => {
          setTimeout(function() {
            this.setState({
              validness: true
            });
          }, 3000);
        }
      );

      event.preventDefault();
    }
  }
  componentDidUpdate(prop, state) {
    if (state.isLoading !== this.state.isLoading) {
      this.props.loadme(this.state.isLoading);
    }
  }
  render() {
    // let myValidation;
    // if (this.state.err.valid === "" || this.state.amount_wanted.length === 0) {
    //   myValidation = true;
    // } else if (this.state.err.valid === true) {
    //   myValidation = false;
    // } else if (this.state.err.valid === false) {
    //   myValidation = true;
    // }
    let alertme =
      this.state.applied === false ? (
        ""
      ) : (
        <Alert style={{ margin: "0 auto" }} color="yellow w-50 text-center">
          You have successfully paid back
        </Alert>
      );
    let alertDanger =
      this.state.validness === true ? (
        ""
      ) : (
        <Alert style={{ margin: "0 auto" }} color="yellow w-50 text-center">
          You do not have sufficent balance in your account. Please fill your
          balance!
        </Alert>
      );
    var listItems = (
      <React.Fragment>
        <div className="col-4">
          <div>
            <label>Received Investment</label>
            <p>{this.state.amount_wanted} Sum</p>
          </div>
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
            <label>Accepted Interest Rate</label>
            <p>{this.state.rate_wanted}%</p>
          </div>
          <div>
            <label>Daily Percentage</label>
            <p>{this.state.dailyPercent}%</p>
          </div>
          <div>
            <label>Daily amount</label>
            <p className="down-p">{this.state.daily} Sum</p>
          </div>
        </div>
        <div className="col-4">
          <div>
            <label>Percentera fee</label>
            <p>2%</p>
          </div>
          <div>
            <label>Daily Percentera fee</label>
            <p>{this.state.percenteraFee} %</p>
          </div>
          <div>
            <label>Today's estimated payment</label>
            <p className="down-p">{this.state.rightAway} Sum</p>
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
    console.log(this.props);
    return (
      <section id="borrowin" className="coverUp">
        <div className="container">
          {alertme}
          {alertDanger}
          <div className="row">
            <h1 className="w-100 text-center mb-3 big-h1">Statistics</h1>
            <form
              onSubmit={this.handleSubmit}
              className="col-md-10 offset-md-1 col bg-white px-4 py-4"
            >
              <div className="row">{listItems}</div>
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
