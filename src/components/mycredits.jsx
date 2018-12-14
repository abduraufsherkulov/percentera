import React from "react";
import { MyCreditsCard } from "./mycreditscard";
import axios from "axios";
export class MyCredits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creditlist: [],
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
      url: "https://hidden-oasis-96512.herokuapp.com/getCredits",
      data: mydata,
      headers: { "Content-type": "application/json" }
    })
      .then(response => {
        this.setState({
          creditlist: response.data,
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
      <section id="mycredits" className="coverUp">
        <div className="container">
          <div className="row">
            <h1 className="w-100 text-center mb-3 big-h1">My credits</h1>
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
                {this.state.creditlist.map(response => (
                  <MyCreditsCard
                    key={response.id}
                    id={response.id}
                    borrow_dead_line={response.borrow_dead_line}
                    borrow_interest={response.borrow_interest}
                    borrow_needed={response.borrow_needed}
                    date={response.date}
                    first_name={response.first_name}
                    last_name={response.last_name}
                    borrow_why={response.borrow_why}
                    credit_type={response.credit_type}
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
