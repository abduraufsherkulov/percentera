import React, { Component } from "react";
import axios from "axios";
import { ListCardCredit } from "./listcardcredit";
export class ListOfCredits extends Component {
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
      url: "https://hidden-oasis-96512.herokuapp.com/getBankCredits"
    })
      .then(response => {
        console.log(response);
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
      <section id="listofcredits" className="coverUp">
        <div className="container">
          <div className="row">
            <h1 className="w-100 text-center mb-3 big-h1">List of credits</h1>
            <form className="col-md-8 offset-md-2 col bg-white mb-5">
              <div className="row">
                {this.state.borrowerlist.map(response => (
                  <ListCardCredit
                    key={response.id}
                    id={response.id}
                    bank_name={response.bank_name}
                    credit_amount={response.credit_amount}
                    credit_interest={response.credit_interest}
                    credit_purpose={response.credit_purpose}
                    interest_type={response.interest_type}
                    credit_long={response.credit_long}
                    user_id={response.user_id}
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
