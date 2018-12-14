import React, { Component } from "react";
import axios from "axios";
import { Alert } from "reactstrap";

export class FinInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bank_name: "",
      branch_region: "",
      branch_dist: "",
      postal_code: "",
      branch_address: "",
      alert: "You have successfully applied",
      applied: false,
      editing: false,
      isLoading: false
    };
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    });
    if (localStorage.getItem("status") !== "Anonymous") {
      const url = "https://hidden-oasis-96512.herokuapp.com/getBankProfile";
      const mydata = JSON.stringify({
        user_id: localStorage.getItem("userId")
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
          console.log(response);
          this.setState({
            bank_name: response.data[0].bank_name,
            branch_region: response.data[0].branch_region,
            branch_dist: response.data[0].branch_dist,
            postal_code: response.data[0].postal_code,
            branch_address: response.data[0].branch_address,
            isLoading: false
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }
  handleSubmit(event) {
    this.setState({
      isLoading: true
    });
    if (localStorage.getItem("status") === "Anonymous") {
      const mylink = "https://hidden-oasis-96512.herokuapp.com/BankProfileAdd";
      const mydata = JSON.stringify({
        user_id: localStorage.getItem("userId"),
        bank_name: this.state.bank_name,
        branch_dist: this.state.branch_dist,
        branch_region: this.state.branch_region,
        postal_code: this.state.postal_code,
        branch_address: this.state.branch_address
      });

      axios({
        method: "post",
        url: mylink,
        data: mydata,
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          console.log(response);
          //handle success
        })
        .catch(function(response) {
          //handle error
          console.log(response);
        });
      const thislink = "https://hidden-oasis-96512.herokuapp.com/updateStatus";

      const thisdata = JSON.stringify({
        user_id: localStorage.getItem("userId"),
        user_status: "Verified"
      });

      axios({
        method: "post",
        url: thislink,
        data: thisdata,
        headers: { "Content-Type": "application/json" }
      }).then(response => {
        localStorage.setItem("status", "Verified");

        this.setState(
          {
            applied: true,
            isLoading: false
          },
          () => {
            const { history } = this.props;
            if (this.state.applied === true) {
              setTimeout(function() {
                history.push("/fininfo");
              }, 3000);
            }
          }
        );
      });
    } else if (
      localStorage.getItem("status") !== "Anonymous" &&
      this.state.editing === false
    ) {
      this.setState({
        editing: true,
        isLoading: false
      });
    } else if (this.state.editing) {
      const mylink =
        "https://hidden-oasis-96512.herokuapp.com/BankProfileUpdate";
      const mydata = JSON.stringify({
        user_id: localStorage.getItem("userId"),
        bank_name: this.state.bank_name,
        branch_dist: this.state.branch_dist,
        branch_region: this.state.branch_region,
        postal_code: this.state.postal_code,
        branch_address: this.state.branch_address
      });

      axios({
        method: "post",
        url: mylink,
        data: mydata,
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          console.log(response);
          this.setState(
            {
              applied: true,
              isLoading: false,
              editing: false
            },
            () => {
              if (this.state.applied === true) {
                setTimeout(() => {
                  this.setState({
                    applied: false
                  });
                }, 3000);
              }
            }
          );
          //handle success
        })
        .catch(function(response) {
          //handle error
          console.log(response);
        });
    }
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleFileSelected(event) {
    this.setState({
      [event.target.name]: event.target.files[0]
    });
    //console.log(event.target.files[0]);
  }
  componentDidUpdate(prop, state) {
    if (state.isLoading !== this.state.isLoading) {
      this.props.loadme(this.state.isLoading);
    }
  }
  componentWillUnmount() {}

  render() {
    const regions = [
      "Andijan",
      "Bukhara",
      "Fergana",
      "Jizzakh",
      "Khorezm",
      "Namangan",
      "Navoiy",
      "Kashkadarya",
      "Samarkand",
      "Sirdarya",
      "Surkhandarya",
      "Tashkent",
      "Karakalpakstan"
    ];
    const banks = [
      'АКБ "Узпромстройбанк"',
      'ГАКБ "Асака" OAO',
      "Национальный Банк ВЭД РУз",
      'АКБ "Invest Finance Bank"',
      'АКБ "Агробанк"',
      'АКБ "Микрокредитбанк"',
      "АК Народный банк (Халқ банк)",
      'АКИБ "Ипотекабанк"',
      'АО "KDB Bank Uzbekistan"',
      'АКБ "Qishloq Qurilish Bank"',
      'ЧАБ "Трастбанк"',
      'АКБ "ASIA ALLIANCE BANK"',
      'АК "Алокабанк"',
      'АO "Ziraat Bank Uzbekistan"',
      "АК Туронбанк",
      'ЧАКБ "Universal Bank"',
      'АКБ "Савдогар"',
      'АИКБ "Ипак Йўли"',
      'ЧАКБ "Orient Finans"',
      'ЧАКБ "RAVNAQ-BANK"',
      'АКБ "Капиталбанк"',
      'ДБ "Садерат Иран"',
      'АКБ "Hamkorbank"',
      'ЧАКБ "Даврбанк"',
      'ЧАКБ "Туркистон"',
      'ЧАКБ "Hi-Tech Bank"',
      "Узагроэкспортбанк",
      "Мадад Инвест Банк"
    ];
    let submitButton;
    if (
      this.state.editing === false &&
      localStorage.getItem("status") === "Anonymous"
    ) {
      submitButton = (
        <button className="btn btn-yellow float-right mt-4">Submit</button>
      );
    } else if (this.state.editing === false) {
      submitButton = (
        <button className="btn btn-yellow float-right mt-4">Edit</button>
      );
    } else {
      submitButton = (
        <button className="btn btn-yellow float-right mt-4">Submit</button>
      );
    }
    let alertme =
      this.state.applied === false ? (
        ""
      ) : (
        <Alert style={{ margin: "0 auto" }} color="yellow w-50 text-center">
          {this.state.alert}
        </Alert>
      );
    let myField;
    if (
      this.state.editing === false &&
      localStorage.getItem("status") === "Anonymous"
    ) {
      myField = false;
    } else if (this.state.editing === false) {
      myField = true;
    }
    return (
      <section id="personal" className="coverUp">
        <div className="container">
          <div className="row">
            {alertme}
            <h1 className="w-100 text-center mb-3 big-h1">
              Financial Information
            </h1>
            <form
              onSubmit={this.handleSubmit}
              className="col-md-8 offset-md-2 col mb-5"
            >
              <div className="row">
                <div className="addcard w-100 bg-white pb-5 mt-4">
                  <h1 className="w-100 pl-4 py-4">Financial information</h1>
                  <div className="mx-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <label className="pt-2" htmlFor="bank_name">
                            Bank name <span>*</span>
                          </label>

                          <select
                            name="bank_name"
                            className="custom-select form-control"
                            id="bank_name"
                            onChange={this.handleChange}
                            required
                            disabled={myField}
                          >
                            <option
                              defaultValue={
                                myField === false
                                  ? "Choose..."
                                  : this.state.bank_name
                              }
                            >
                              {myField === false
                                ? "Choose..."
                                : this.state.bank_name}
                            </option>
                            {banks.map(response => (
                              <React.Fragment key={response}>
                                <option value={response}>{response}</option>
                              </React.Fragment>
                            ))}
                          </select>
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">Looks bad!</div>
                        </div>
                        <div>
                          <label className="pt-2" htmlFor="branch_dist">
                            City/District of branch <span>*</span>
                          </label>
                          <input
                            onChange={this.handleChange}
                            name="branch_dist"
                            type="text"
                            className="form-control"
                            id="branch_dist"
                            placeholder="Tashkent"
                            value={this.state.branch_dist}
                            disabled={myField}
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">Looks bad!</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          <label className="pt-2" htmlFor="surname">
                            Region of Branch <span>*</span>
                          </label>

                          <select
                            name="branch_region"
                            className="custom-select form-control"
                            id="branch_region"
                            onChange={this.handleChange}
                            required
                            disabled={myField}
                          >
                            <option
                              defaultValue={
                                myField === false
                                  ? "Choose..."
                                  : this.state.branch_region
                              }
                            >
                              {myField === false
                                ? "Choose..."
                                : this.state.branch_region}
                            </option>
                            {regions.map(response => (
                              <React.Fragment key={response}>
                                <option value={response}>{response}</option>
                              </React.Fragment>
                            ))}
                          </select>
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">Looks bad!</div>
                        </div>
                        <div>
                          <label className="pt-2" htmlFor="postal_code">
                            Postal Code <span>*</span>
                          </label>
                          <input
                            onChange={this.handleChange}
                            name="postal_code"
                            type="number"
                            className="form-control"
                            id="postal_code"
                            placeholder="120105"
                            value={this.state.postal_code}
                            disabled={myField}
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">Looks bad!</div>
                        </div>
                      </div>

                      <div className="col-12">
                        <label className="pt-2" htmlFor="branch_address">
                          District, house/apartment, block apartment{" "}
                          <span>*</span>
                        </label>
                        <input
                          onChange={this.handleChange}
                          name="branch_address"
                          type="text"
                          className="form-control"
                          id="branch_address"
                          placeholder="4-10a-2"
                          value={this.state.branch_address}
                          disabled={myField}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">Looks bad!</div>
                      </div>
                    </div>

                    {submitButton}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
