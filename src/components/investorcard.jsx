import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
export class InvestorCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      id,
      invest_amount,
      // invest_long,
      invest_interest,
      created_at,
      first_name,
      last_name,
      credit_type,
      user_id
    } = this.props;
    let userStatus = localStorage.getItem("status");
    let userId = parseInt(localStorage.getItem("userId"), 10);
    let viewButton =
      userStatus === "Anonymous" ||
      userStatus === "Verified" ||
      userId === user_id ? (
        <Button color="yellow" disabled={true}>
          View
        </Button>
      ) : (
        <Button color="yellow" to={`/investin/${id}`} tag={Link}>
          View
        </Button>
      );
    return (
      <div className="w-100 listborder">
        <div className="col-12">
          <div className="form-group mx-md-4 my-4">
            <div className="d-flex justify-content-around">
              <div>
                <span>Investor</span>
                <h1>
                  {first_name} {last_name}
                </h1>
              </div>
              <div>
                <span>Amount</span>
                <h1>{invest_amount}</h1>
              </div>
              <div>
                <span>Interest rate</span>
                <h1>
                  {invest_interest} {credit_type}
                </h1>
              </div>
              <div>
                <span>Given Date</span>
                <h1>{moment(created_at).format("MMM D, YYYY")}</h1>
              </div>
            </div>
            <div className="status-button d-flex justify-content-between align-items-center my-2">
              <span>
                Last checked: <b>20 minutes ago</b>
              </span>
              {viewButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
