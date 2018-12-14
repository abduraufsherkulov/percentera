import React, { Component } from "react";
import { Alert } from "reactstrap";
import axios from "axios";

export class BankOfPercentera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      card_number: "",
      expire: "",
      balance: "",
      added: false,
      isLoading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }
  handleSubmit(event) {
    this.setState({
      isLoading: true
    });
    const { history } = this.props;
    const url = "https://hidden-oasis-96512.herokuapp.com/bankCardsAdd";
    const mydata = JSON.stringify({
      balance: this.state.balance,
      card_holder_name: this.state.name,
      card_number: this.state.card_number,
      expire_date: this.state.expire
    });
    axios({
      method: "post",
      url: url,
      data: mydata,
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => {
        this.setState(
          {
            added: true,
            isLoading: false
          },
          () => {
            setTimeout(function() {
              history.push("/mycards");
            }, 3000);
          }
        );
      })
      .catch(response => {
        console.log(response);
      });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  componentDidUpdate(prop, state) {
    if (state.isLoading !== this.state.isLoading) {
      this.props.loadme(this.state.isLoading);
    }
  }
  render() {
    let alertme =
      this.state.added === false ? (
        ""
      ) : (
        <Alert style={{ margin: "0 auto" }} color="yellow w-50 text-center">
          You successfully added your card
        </Alert>
      );
    return (
      <section id="bankofpercentera">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-8 offset-2">
                {alertme}
                <div className="row">
                  <h1 className="w-100 text-center mb-3 big-h1">Constructor</h1>
                  <div className="col-md-6">
                    <div>
                      <label className="pt-2" htmlFor="name">
                        Full name
                      </label>
                      <input
                        onChange={this.handleChange}
                        name="name"
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Abdurauf Sherkulov"
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">Looks bad!</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <label className="pt-2" htmlFor="expire">
                        Expire date
                      </label>
                      <input
                        onChange={this.handleChange}
                        name="expire"
                        type="text"
                        className="form-control"
                        id="expire"
                        placeholder="04/20"
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">Looks bad!</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <label className="pt-2" htmlFor="card_number">
                        Card Number
                      </label>
                      <input
                        onChange={this.handleChange}
                        name="card_number"
                        type="number"
                        className="form-control"
                        id="card_number"
                        maxLength="16"
                        placeholder="6295 3244 1202 7856"
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">Looks bad!</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <label className="pt-2" htmlFor="balance">
                        Balance
                      </label>
                      <input
                        onChange={this.handleChange}
                        name="balance"
                        type="number"
                        className="form-control"
                        id="balance"
                        placeholder="5000"
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">Looks bad!</div>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-end mt-4">
                  <button className="btn btn-yellow">Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
