import React, { Component } from "react";
import axios from "axios";
import { CreditsInCard } from "./creditsincard";
import { Alert } from "reactstrap";
export class CreditsIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invests: [],
      applied: false,
      isLoading: false
    };
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    });
    const url = "https://hidden-oasis-96512.herokuapp.com/listPull";
    const mydata = JSON.stringify({
      borrow_id: this.props.match.params.id
    });
    axios({
      method: "post",
      url: url,
      data: mydata,
      headers: { "content-type": "application/json" }
    })
      .then(response => {
        this.setState({
          invests: response.data,
          isLoading: false
        });
      })
      .catch(response => {
        console.log(response);
      });
  }
  handleSubmit = (event, pull_id) => {
    this.setState({
      isLoading: true
    });
    const { history } = this.props;
    const url = "https://hidden-oasis-96512.herokuapp.com/updatePullStatus";
    const mydata = JSON.stringify({
      pull_id: pull_id,
      status: event.target.value
    });
    axios({
      method: "post",
      url: url,
      data: mydata,
      headers: { "content-type": "application/json" }
    })
      .then(response => {
        console.log(response);
        if (response.data === true) {
          this.setState(
            {
              applied: true,
              isLoading: false
            },
            () => {
              window.scrollTo(0, 0);
              setTimeout(function() {
                history.goBack();
              }, 3000);
            }
          );
        }
      })
      .catch(response => {
        console.log(response);
      });
    event.preventDefault();
  };
  componentDidUpdate(prop, state) {
    if (state.isLoading !== this.state.isLoading) {
      this.props.loadme(this.state.isLoading);
    }
  }
  render() {
    let alertme =
      this.state.applied === false ? (
        ""
      ) : (
        <Alert style={{ margin: "0 auto" }} color="yellow w-50 text-center">
          You have successfully applied to accepted
        </Alert>
      );
    console.log(this.props);
    return (
      <section id="creditsin" className="coverUp">
        <div className="container">
          {alertme}
          <div className="row">
            <h1 className="w-100 text-center mb-3 big-h1">Offers</h1>
            <form
              onSubmit={this.handleSubmit}
              className="col-md-8 offset-md-2 col bg-white mb-5"
            >
              <div className="row">
                {this.state.invests.map(response => (
                  <CreditsInCard
                    key={response.id}
                    id={response.id}
                    borrow_id={response.borrow_id}
                    amount={response.amount}
                    created_at={response.created_at}
                    rate={response.rate}
                    status={response.status}
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
