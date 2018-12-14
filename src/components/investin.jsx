import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

library.add(faCaretRight, faCaretLeft);
const localizer = BigCalendar.momentLocalizer(moment);

export class InvestIn extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      amount: +"",
      percent: "",
      long: +"",
      ours: 2,
      given: "",
      divided: [],
      events: []
    };
  }
  componentDidMount() {
    const endpoint = "https://hidden-oasis-96512.herokuapp.com/getCredit";
    const mydata = JSON.stringify({
      user_id: localStorage.getItem("userId"),
      invest_id: this.props.match.params.id
    });
    axios({
      method: "post",
      data: mydata,
      url: endpoint,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        console.log(response);
        this.setState({
          amount: response.data[0].invest_amount,
          percent: response.data[0].invest_interest,
          long: response.data[0].invest_long,
          given: response.data[0].created_at
        });

        //investor + percentera percentage
        let overall = this.state.ours + +this.state.percent;
        //overall percent should be paid ex. overall + 600(PERCENT)
        let percentOfMoney = +this.state.amount * (overall / 100);
        //overall of money should be paid with percentage 5600
        let overallMoney = +this.state.amount + percentOfMoney;
        //daily should equal in money
        let daily = overallMoney / this.state.long;
        //daily should equal in percent
        let dailyPercent = overall / this.state.long;

        console.log(this.state.given);

        let add = moment(this.state.given).add(this.state.long, "day");

        let mydate = new Date(add);
        console.log(mydate);

        let i = 1;
        let myArr = [];

        for (i; i <= +this.state.long; i++) {
          let per = i * daily;
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

        console.log(this.state.events);

        let must = {
          overall: overall,
          percentOfMoney: percentOfMoney,
          overallMoney: overallMoney,
          daily: daily,
          dailyPercent: dailyPercent
        };

        let mustJSON = JSON.stringify(must);
        let last = JSON.parse(mustJSON);
        this.setState({
          divided: this.state.divided.concat([last])
        });
      })
      .catch(response => {
        console.log(response);
      });
  }

  handleSubmit(event) {
    const endpoint = "https://hidden-oasis-96512.herokuapp.com/checkBalance";
    const mydata = JSON.stringify({
      user_id: localStorage.getItem("userId"),
      amount: this.state.amount
    });
    console.log(mydata);
    axios({
      method: "post",
      url: endpoint,
      data: mydata,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.data === "NO") {
          this.setState({
            verifyMessage: "You don't have sufficient balance in your account"
          });
        } else {
          const thispoint =
            "https://hidden-oasis-96512.herokuapp.com/applyInvestor";
          const thisdata = JSON.stringify({
            user_id: localStorage.getItem("userId"),
            investor_id: this.props.match.params.id
          });
          axios({
            method: "post",
            url: thispoint,
            data: thisdata,
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => {
              console.log(response);
            })
            .catch(response => {
              console.log(response);
            });
        }
      })
      .catch(response => {
        console.log(response);
      });
    event.preventDefault();
  }
  render() {
    var listItems = this.state.divided.map(response => (
      <div key={response.overall} className="row">
        <div className="col-4">
          <div>
            <label>Overall Percent</label>
            <p>{response.overall}</p>
          </div>
          <div>
            <label>Percent in money</label>
            <p className="down-p">{response.overallMoney}</p>
          </div>
        </div>
        <div className="col-4">
          <div>
            <label>Daily Amount Should be Paid</label>
            <p>{response.daily}</p>
          </div>
          <div>
            <label>Overall should be paid</label>
            <p className="down-p">{response.overallMoney}</p>
          </div>
        </div>
        <div className="col-4">
          <div>
            <label>Daily Percentage</label>
            <p>{response.dailyPercent}</p>
          </div>
          <div>
            <label>Overall without percent</label>
            <p className="down-p">{this.state.amount}</p>
          </div>
        </div>
      </div>
    ));

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
      <section id="investin" className="coverUp">
        <div className="container">
          <div className="row">
            <h1 className="w-100 text-center mb-3 big-h1">Statistics</h1>
            <form
              onSubmit={this.handleSubmit}
              className="col-md-8 offset-md-2 col bg-white px-4 py-4"
            >
              {listItems}
              <button className="btn btn-yellow float-right">Apply</button>
            </form>
            <div className="col-md-8 offset-md-2 col bg-white mb-5">
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
