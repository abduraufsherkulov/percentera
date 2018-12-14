import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class MyInvestmentsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = event => {
    this.props.submit(event, this.props.id);
  };
  render() {
    const { id, amount, created_at, rate, borrow_id, status } = this.props;
    let userStatus = localStorage.getItem("status");
    //let userId = parseInt(localStorage.getItem("userId"), 10);
    // let activeButtons = (
    //   <div className="text-right">
    //     <Button
    //       color="success"
    //       className="mr-3"
    //       name="stat"
    //       value="accept"
    //       onClick={this.handleSubmit}
    //     >
    //       <FontAwesomeIcon icon="check" />
    //       {"  "}
    //       Accept
    //     </Button>
    //     <Button
    //       color="danger"
    //       name="stat"
    //       value="decline"
    //       onClick={this.handleSubmit}
    //     >
    //       <FontAwesomeIcon icon="times" />
    //       {"  "}
    //       Decline
    //     </Button>
    //   </div>
    // );
    let viewButton =
      userStatus === "Anonymous" ||
      userStatus === "Verified" ||
      userStatus === null ? (
        <Button color="yellow" disabled={true}>
          View
        </Button>
      ) : (
        <Button
          color="yellow"
          to={`/investmentin/${borrow_id}/investinstat/${id}`}
          tag={Link}
        >
          View
        </Button>
      );
    let disabledButton = (
      <Button color="danger" disabled>
        <FontAwesomeIcon icon="times" />
        {"  "}Declined
      </Button>
    );
    //to change status
    let main_status;
    if (status === "waiting_approve") {
      main_status = "Waiting for borrower's response";
    } else if (status === "accepted") {
      main_status = "Borrower accepted this offer";
    } else if (status === "declined") {
      main_status = "Borrower declined this offer";
    } else if (status === "paid") {
      main_status = "You have already recieved back your investment";
    }

    let showButton;
    if (status === "waiting_approve") {
      showButton = "";
    } else if (status === "accepted") {
      showButton = viewButton;
    } else if (status === "declined") {
      showButton = disabledButton;
    }

    return (
      <div className="w-100 listborder">
        <div className="col-12">
          <div className="form-group mx-md-4 my-4">
            <div className="d-flex justify-content-around">
              <div>
                <span>Investor ID</span>
                <h1>{rate}</h1>
              </div>
              <div>
                <span>Amount</span>
                <h1>{amount}</h1>
              </div>
              <div>
                <span>Interest rate</span>
                <h1>{rate}%</h1>
              </div>
              <div>
                <span>The offer date</span>
                <h1>{moment(created_at).format("MMM D, YYYY")}</h1>
              </div>
            </div>
            <div className="status-button d-flex justify-content-between align-items-center my-2">
              <span>
                Status: <b className="">{main_status}</b>
              </span>
              {showButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
