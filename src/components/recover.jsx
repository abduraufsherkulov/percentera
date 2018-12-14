import React, { Component } from "react";
import { Container, Row, Alert } from "reactstrap";
import axios from "axios";

export class Recover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: false,
      alert: {
        message: ""
      },
      changed: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    const url =
      "https://hidden-oasis-96512.herokuapp.com/changePasswordByUsername";
    const mydata = JSON.stringify({
      username: this.state.username,
      password: this.state.password
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
        if (response.data === "OK") {
          this.setState(
            {
              changed: true,
              alert: {
                message: "You have successfully changed your password!"
              }
            },
            () => {
              const { history } = this.props;
              if (this.state.changed === true) {
                setTimeout(function() {
                  history.push("/signin");
                }, 3000);
              }
            }
          );
        } else {
          this.setState({
            errorMessage: true
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  render() {
    let alertme =
      this.state.changed === "" ? (
        ""
      ) : (
        <Alert style={{ margin: "0 auto" }} color="yellow w-50 text-center">
          {this.state.alert.message}
        </Alert>
      );
    let classes = "form-control";
    classes += this.state.errorMessage === true ? " is-invalid" : "";
    return (
      <section id="recover">
        <Container>
          <Row>
            {alertme}
            <h1 className="w-100 text-center mb-3 big-h1">Recover</h1>
            <form
              onSubmit={this.handleSubmit}
              className="col-md-4 offset-md-4 col"
            >
              <div className="form-group">
                <div>
                  <label htmlFor="login" />
                  <input
                    onChange={this.handleChange}
                    type="text"
                    className={classes}
                    id="login"
                    name="username"
                    placeholder="Login"
                    required
                  />
                  <div className="invalid-feedback">
                    Username or password is incorrect
                  </div>
                </div>
                <div>
                  <label htmlFor="password" />
                  <input
                    onChange={this.handleChange}
                    type="password"
                    className={classes}
                    id="password"
                    placeholder="Password"
                    name="password"
                    required
                  />
                </div>
                <button className="btn btn-yellow w-100 mt-2 mb-2 big-btn">
                  SUBMIT
                </button>
              </div>
            </form>
          </Row>
        </Container>
      </section>
    );
  }
}
