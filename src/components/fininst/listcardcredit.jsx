import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
export class ListCardCredit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      id,
      bank_name,
      credit_amount,
      credit_interest,
      credit_purpose,
      interest_type,
      credit_long,
      user_id
    } = this.props;
    let userStatus = localStorage.getItem("status");
    let userId = parseInt(localStorage.getItem("userId"), 10);
    let viewButton =
      userStatus === "Anonymous" ||
      userStatus === "Verified" ||
      userId === user_id ||
      userStatus === null ? (
        <Button color="yellow" disabled={true}>
          View
        </Button>
      ) : (
        <Button color="yellow" to={`/listofcreditsin/${id}`} tag={Link}>
          View
        </Button>
      );
    return (
      <div className="w-100 listborder">
        <div className="col-12">
          <div className="form-group mx-md-4 my-4">
            <label htmlFor="validationServer01">
              <i>For </i>
              {credit_purpose}
            </label>
            <div className="d-flex justify-content-around">
              <div>
                <span>Creditor</span>
                <h1>{bank_name}</h1>
              </div>
              <div>
                <span>Amount</span>
                <h1>{credit_amount}</h1>
              </div>
              <div>
                <span>Interest rate</span>
                <h1>
                  {credit_interest}% {interest_type}
                </h1>
              </div>
              <div>
                <span>Range</span>
                <h1>
                  {credit_long} {interest_type === "Daily" ? "Days" : "Months"}
                </h1>
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
