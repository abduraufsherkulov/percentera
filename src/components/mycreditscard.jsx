import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export class MyCreditsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      id,
      // borrow_dead_line,
      borrow_interest,
      borrow_needed,
      borrow_why,
      date,
      first_name,
      last_name,
      credit_type
    } = this.props;
    return (
      <div className="w-100 listborder">
        <div className="col-12">
          <div className="form-group mx-md-4 my-4">
            <label htmlFor="validationServer01">
              <i>For </i>
              {borrow_why}
            </label>
            <div className="d-flex justify-content-around">
              <div>
                <span>investor</span>
                <h1>
                  {first_name} {last_name}
                </h1>
              </div>
              <div>
                <span>Amount</span>
                <h1>{borrow_needed}</h1>
              </div>
              <div>
                <span>Interest rate</span>
                <h1>
                  {borrow_interest} {credit_type}
                </h1>
              </div>
              <div>
                <span>Deadline</span>
                <h1>{moment(date).format("MMM D, YYYY")}</h1>
              </div>
            </div>
            <div className="status-button my-2 float-right">
              {/* <span>
                Last checked: <b>20 minutes ago</b>
              </span> */}
              <Button color="yellow" to={`/creditsin/${id}`} tag={Link}>
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
