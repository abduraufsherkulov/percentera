import React from "react";
import { Button, Form, Container, Row } from "reactstrap";
import Calendar from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";
import queryString from "query-string";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

export class PerCredit extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      investor_id: +"",
      borrower_id: +"",
      amount: +"",
      percent: +"",
      long: +"",
      ours: 2,
      given: "",
      paynow: +"",
      invprofit: +"",
      ourprofit: +"",
      divided: [],
      verify: "",
      verifyMessage: "",
      events: []
    };
  }
  componentWillMount() {
    let params = queryString.parse(this.props.location.search);
    if (params.borrow) {
      const endpoint = "https://hidden-oasis-96512.herokuapp.com/getInvests";
      const mydata = JSON.stringify({
        user_id: localStorage.getItem("userId"),
        borrow_id: params.borrow
      });
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: mydata
      })
        .then(
          response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Request failed!");
          },
          networkError => console.log(networkError.message)
        )
        .then(jsonResponse => {
          console.log(jsonResponse);
          this.setState({
            amount: jsonResponse[0].borrow_needed,
            percent: jsonResponse[0].borrow_interest,
            long: jsonResponse[0].borrow_dead_line,
            given: jsonResponse[0].created_at
          });
          console.log(jsonResponse);
          this.setState({
            investor_id: jsonResponse[0].id
          });
          console.log(this.state.investor_id);
          //investor + percentera percentage
          let overall = this.state.ours + +this.state.percent;
          //overall percent should be paid ex. overall + 600(PERCENT)
          let percentOfMoney = +this.state.amount * (overall / 100);
          //overall of money should be paid with percentage 5600
          let overallMoney = +this.state.amount + percentOfMoney;
          //daily should equal in money
          let daily = percentOfMoney / this.state.long;

          //daily should equal in percent
          let dailyPercent = overall / this.state.long;

          let paynow = +"";

          let i = 1;
          let myArr = [];

          let myDay = new Date();
          for (i; i <= +this.state.long; i++) {
            let per = i * daily + +this.state.amount;
            let add = moment(this.state.given).add(i, "day");
            let a = {
              start: new Date(add),
              end: new Date(moment(add).add(0, "day")),
              title: `${per} Sum`
            };

            if (a.start.getDate() === myDay.getDate()) {
              paynow = parseFloat(a.title.toFixed(2));
            }

            myArr.push(a);
          }

          let overallprofit = paynow - this.state.amount;
          let ourprofit = (overallprofit * this.state.ours) / overall;
          ourprofit = parseFloat(ourprofit.toFixed(2));
          let invprofit = paynow - ourprofit;
          console.log(paynow);
          console.log(overallprofit);
          console.log(ourprofit);
          console.log(invprofit);
          this.setState({
            events: myArr,
            paynow: paynow,
            invprofit: invprofit,
            ourprofit: ourprofit
          });

          console.log(this.state.events);

          let must = {
            overall: overall,
            percentOfMoney: percentOfMoney,
            overallMoney: overallMoney,
            daily: daily,
            dailyPercent: dailyPercent,
            paynow: paynow
          };

          let mustJSON = JSON.stringify(must);
          let last = JSON.parse(mustJSON);
          this.setState({
            divided: this.state.divided.concat([last])
          });
        });
    } else if (params.invest) {
      const endpoint = "https://hidden-oasis-96512.herokuapp.com/getCredit";
      const mydata = JSON.stringify({
        user_id: localStorage.getItem("userId"),
        invest_id: params.invest
      });
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: mydata
      })
        .then(
          response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Request failed!");
          },
          networkError => console.log(networkError.message)
        )
        .then(jsonResponse => {
          console.log(jsonResponse);
          this.setState({
            amount: jsonResponse[0].invest_amount,
            percent: jsonResponse[0].invest_interest,
            long: jsonResponse[0].invest_long,
            given: jsonResponse[0].created_at
          });
          console.log(jsonResponse);
          this.setState({
            investor_id: jsonResponse[0].id
          });
          console.log(this.state.investor_id);
          //investor + percentera percentage
          let overall = this.state.ours + +this.state.percent;
          //overall percent should be paid ex. overall + 600(PERCENT)
          let percentOfMoney = +this.state.amount * (overall / 100);
          //overall of money should be paid with percentage 5600
          let overallMoney = +this.state.amount + percentOfMoney;
          //daily should equal in money
          let daily = percentOfMoney / this.state.long;

          //daily should equal in percent
          let dailyPercent = overall / this.state.long;

          let paynow = +"";

          let i = 1;
          let myArr = [];

          let myDay = new Date();
          for (i; i <= +this.state.long; i++) {
            let per = i * daily + +this.state.amount;
            let add = moment(this.state.given).add(i, "day");
            let a = {
              start: new Date(add),
              end: new Date(moment(add).add(0, "day")),
              title: `${per} Sum`
            };

            if (a.start.getDate() === myDay.getDate()) {
              paynow = parseInt(a.title, 10);
            }

            myArr.push(a);
          }

          let overallprofit = paynow - this.state.amount;
          let ourprofit = (overallprofit * this.state.ours) / overall;
          ourprofit = ourprofit.round(2);
          let invprofit = paynow - ourprofit;

          this.setState({
            events: myArr,
            paynow: paynow,
            invprofit: invprofit,
            ourprofit: ourprofit
          });

          console.log(this.state.events);

          let must = {
            overall: overall,
            percentOfMoney: percentOfMoney,
            overallMoney: overallMoney,
            daily: daily,
            dailyPercent: dailyPercent,
            paynow: paynow
          };

          let mustJSON = JSON.stringify(must);
          let last = JSON.parse(mustJSON);
          this.setState({
            divided: this.state.divided.concat([last])
          });
        });
    }
  }
  //postgres
  handleSubmit(event) {
    let params = queryString.parse(this.props.location.search);
    const endpoint = "https://hidden-oasis-96512.herokuapp.com/checkBalance";
    const mydata = JSON.stringify({
      user_id: localStorage.getItem("userId"),
      amount: this.state.paynow
    });
    console.log(mydata);
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: mydata
    })
      .then(
        response => {
          if (response.ok) {
            return response.text();
          }
          throw new Error("Request failed!");
        },
        networkError => {
          console.log(networkError.message);
        }
      )
      .then(response => {
        console.log(response);
        if (response === "NO") {
          this.setState({
            verifyMessage: "You don't have sufficient balance in your account"
          });
        } else {
          if (params.invest) {
            const thispoint =
              "https://hidden-oasis-96512.herokuapp.com/payForInvestor";
            const thisdata = JSON.stringify({
              user_id: localStorage.getItem("userId"),
              investor_id: this.state.investor_id,
              pay_amount: this.state.invprofit,
              profit: this.state.ourprofit
            });
            fetch(thispoint, {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: thisdata
            })
              .then(
                response => {
                  if (response.ok) {
                    return response.text();
                  }
                  throw new Error("Request failed!");
                },
                networkError => {
                  console.log(networkError.message);
                }
              )
              .then(response => {
                console.log(response);
              });
          } else {
            const thispoint =
              "https://hidden-oasis-96512.herokuapp.com/payForInvestor";
            const thisdata = JSON.stringify({
              user_id: localStorage.getItem("userId"),
              borrower_id: this.state.investor_id,
              pay_amount: this.state.invprofit,
              profit: this.state.ourprofit
            });
            fetch(thispoint, {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: thisdata
            })
              .then(
                response => {
                  if (response.ok) {
                    return response.text();
                  }
                  throw new Error("Request failed!");
                },
                networkError => {
                  console.log(networkError.message);
                }
              )
              .then(response => {
                console.log(this.state.ourprofit);
                console.log(parseInt(this.state.invprofit, 10));
                console.log(response);
              });
          }
        }
      });
    event.preventDefault();
  }
  render() {
    var listItems = this.state.divided.map(response => (
      <div key={response.overall}>
        <p>
          <span>Overall Percent</span>: {response.overall} (Investor +
          Percentera (2%))
        </p>
        <p>
          <span>Daily AMount Should be Paid</span>: {response.daily}
        </p>
        <p>
          <span>Daily Percentage</span>: {response.dailyPercent}
        </p>
        <p>
          <span>Percent in Money</span>: {response.overallMoney}
        </p>
        <p>
          <span>Overall should be paid</span>: {response.overallMoney}
        </p>
        <p>
          <span>Overall without percent</span>: {this.state.amount}
        </p>
        <p>
          <span>Today's payment</span>: {response.paynow}
        </p>
        {this.state.paynow === 0 ? "" : <Button>Pay back</Button>}
        <p>{this.state.verifyMessage}</p>
        profit:
        {this.state.ourprofit}
        amount:
        {this.state.invprofit}
        user_id
        {localStorage.getItem("userId")}
        inv.id:
        {this.state.investor_id}
        userid: {localStorage.getItem("userId")}
      </div>
    ));
    return (
      <Container>
        <Row>
          <Form id="investorperlist" onSubmit={this.handleSubmit}>
            {listItems}
          </Form>

          <Calendar
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events}
            style={{ height: "100vh", width: "100%" }}
          />
        </Row>
      </Container>
    );
  }
}

// {
//   start: new Date('2018/8/18'),
//   end: new Date(moment('2018/8/18').add(1, "days")),
//   title: "122"
// }
