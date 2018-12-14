import React, { Component } from "react";
import { InvestorCard } from "./investorcard";
import axios from "axios";
export class InvestorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      investorlist: []
    };
  }
  componentDidMount() {
    const url = "https://hidden-oasis-96512.herokuapp.com/getInvestors";
    axios({
      method: "get",
      url: url
    }).then(response => {
      console.log(response.data);
      this.setState({
        investorlist: response.data
      });
    });
  }
  render() {
    return (
      <section id="investorlist" className="coverUp">
        <div className="container">
          <div className="row">
            <h1 className="w-100 text-center mb-3 big-h1">List of Investors</h1>
            <form className="col-md-8 offset-md-2 col bg-white mb-5">
              <div className="row">
                {this.state.investorlist.map(result => (
                  <InvestorCard
                    key={result.id}
                    id={result.id}
                    invest_amount={result.invest_amount}
                    invest_long={result.invest_long}
                    invest_interest={result.invest_interest}
                    created_at={result.created_at}
                    first_name={result.first_name}
                    last_name={result.last_name}
                    credit_type={result.credit_type}
                    user_id={result.user_id}
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

export default InvestorList;
