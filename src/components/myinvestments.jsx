import React from "react";
import axios from "axios";
import { MyInvestmentsCard } from "./myinvestmentscard";

export class MyInvestments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      investlist: [],
      user_id: localStorage.getItem("userId"),
      switch: false,
      isLoading: false
    };
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    });
    const mydata = JSON.stringify({
      user_id: this.state.user_id
    });
    axios({
      method: "post",
      url: "https://hidden-oasis-96512.herokuapp.com/getInvestorPulls",
      data: mydata,
      headers: { "Content-type": "application/json" }
    })
      .then(response => {
        console.log(response);
        this.setState({
          investlist: response.data,
          isLoading: false
        });
      })
      .catch(response => {
        console.log(response);
      });
  }
  handleSwitch(event) {
    this.setState({
      switch: !this.state.switch
    });
  }
  componentDidUpdate(prop, state) {
    if (state.isLoading !== this.state.isLoading) {
      this.props.loadme(this.state.isLoading);
    }
  }
  render() {
    return (
      <section id="myinvestments" className="coverUp">
        <div className="container">
          <div className="row">
            <h1 className="w-100 text-center mb-3 big-h1">My investments</h1>
            <form className="col-md-8 offset-md-2 col bg-white mb-5">
              <div className="row">
                <div className="d-flex align-items-center justify-content-center w-100 switcher my-5">
                  <span className="mr-5">Inactive</span>
                  <label className="switch mb-0">
                    <input onChange={this.handleSwitch} type="checkbox" />
                    <span className="slider round" />
                  </label>
                  <span className="ml-5">Active</span>
                </div>
                {this.state.investlist.map(result => (
                  <MyInvestmentsCard
                    key={result.id}
                    id={result.id}
                    borrow_id={result.borrow_id}
                    amount={result.amount}
                    created_at={result.created_at}
                    rate={result.rate}
                    status={result.status}
                    submit={this.handleSubmit}
                  />
                ))}
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
