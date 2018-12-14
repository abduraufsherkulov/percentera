import React, { Component } from "react";
import axios from "axios";
import { BorrowerCard } from "./borrowercard";
export class BorrowerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borrowerlist: [],
      isLoading: false
    };
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    });
    axios({
      method: "get",
      url: "https://hidden-oasis-96512.herokuapp.com/getBorrowers"
    })
      .then(response => {
        this.setState({
          borrowerlist: response.data,
          isLoading: false
        });
      })
      .catch(response => {
        console.log(response);
      });
  }
  componentDidUpdate(prop, state) {
    if (this.state.isLoading !== state.isLoading)
      this.props.loadme(this.state.isLoading);
  }
  render() {
    return (
      <section id="borrowerlist" className="coverUp">
        <div className="container">
          <div className="row">
            <h1 className="w-100 text-center mb-3 big-h1">List of borrowers</h1>
            <form className="col-md-8 offset-md-2 col bg-white mb-5">
              <div className="row">
                {this.state.borrowerlist.map(response => (
                  <BorrowerCard
                    key={response.id}
                    id={response.id}
                    borrow_dead_line={response.borrow_dead_line}
                    borrow_interest={response.borrow_interest}
                    borrow_needed={response.borrow_needed}
                    borrow_why={response.borrow_why}
                    date={response.date}
                    first_name={response.first_name}
                    last_name={response.last_name}
                    credit_type={response.credit_type}
                    user_id={response.user_id}
                    tempbalance={response.tempbalance}
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
