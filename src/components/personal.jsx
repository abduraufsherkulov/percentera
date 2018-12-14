import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import axios from "axios";
import { Alert } from "reactstrap";

export class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      surname: "",
      birth: moment(),
      given_date: moment(),
      exp_date: moment(),
      city_born: "",
      region_current: "",
      city_current: "",
      district: "",
      passport: "",
      given_by: "",
      phone: "",
      income: +"",
      passport_img: "",
      income_img: "",
      fm: "",
      minimum_wage: 200000,
      alert: "You have successfully applied",
      applied: false,
      editing: false,
      isLoading: ""
    };
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log("DidUpdate");
    this.setState({
      isLoading: true
    });
    const getRating = "https://hidden-oasis-96512.herokuapp.com/getRating";
    const getData = JSON.stringify({
      user_id: localStorage.getItem("userId")
    });

    axios({
      method: "post",
      url: getRating,
      data: getData,
      headers: { "content-type": "application/json" }
    })
      .then(response => {
        console.log(response);
      })
      .catch(response => {
        console.log(response);
      });

    if (localStorage.getItem("status") !== "Anonymous") {
      const url = `http://mycontract.uz/frontend/web/profile/get?id=${localStorage.getItem(
        "userId"
      )}`;
      axios({
        method: "post",
        url: url,
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(response => {
          console.log(response);
          this.setState({
            first_name: response.data.first_name,
            surname: response.data.surname,
            birth: moment(response.data.birth, "DD/MM/YYYY"),
            given_date: moment(response.data.given_date, "DD/MM/YYYY"),
            exp_date: moment(response.data.exp_date, "DD/MM/YYYY"),
            city_born: response.data.city_born,
            region_current: response.data.region_current,
            city_current: response.data.city_current,
            district: response.data.district,
            passport: response.data.passport,
            given_by: response.data.given_by,
            phone: response.data.phone,
            fm: response.data.family_members,
            income: response.data.income,
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
    console.log("DidSubmit");
    this.setState({
      isLoading: true,
      myField: true
    });

    let reserved =
      (this.state.income - this.state.fm * this.state.minimum_wage) * 0.8;
    let rating;
    if (reserved < 1000000) {
      rating = "E";
    } else if (reserved < 2000000) {
      rating = "D";
    } else if (reserved < 3000000) {
      rating = "C";
    } else if (reserved < 4000000) {
      rating = "B";
    } else if (reserved > 4000000) {
      rating = "A";
    }

    console.log(reserved, rating);
    const { history } = this.props;
    if (localStorage.getItem("status") === "Anonymous") {
      const ratingLink = "https://hidden-oasis-96512.herokuapp.com/addRating";
      const ratingData = JSON.stringify({
        user_id: localStorage.getItem("userId"),
        rating: rating,
        reserved: reserved
      });

      axios({
        method: "post",
        url: ratingLink,
        data: ratingData,
        headers: { "content-type": "application/json" }
      })
        .then(response => {
          localStorage.setItem("rating", response.data[0].rating);
        })
        .catch(response => {
          console.log(response);
        });

      const mylink = "http://mycontract.uz/frontend/web/profile/add";
      const bodyFormData = new FormData();

      bodyFormData.set("user_id", localStorage.getItem("userId"));
      bodyFormData.set("first_name", this.state.first_name);
      bodyFormData.set("surname", this.state.surname);
      bodyFormData.set("birth", this.state.birth.format("DD/MM/YYYY"));
      bodyFormData.set("city_born", this.state.city_born);
      bodyFormData.set("region_current", this.state.region_current);
      bodyFormData.set("city_current", this.state.city_current);
      bodyFormData.set("district", this.state.district);
      bodyFormData.set("passport", this.state.passport);
      bodyFormData.set("given_by", this.state.given_by);
      bodyFormData.set(
        "given_date",
        this.state.given_date.format("DD/MM/YYYY")
      );
      bodyFormData.set("exp_date", this.state.exp_date.format("DD/MM/YYYY"));
      bodyFormData.set("phone", this.state.phone);
      bodyFormData.set("family_members", this.state.fm);
      bodyFormData.set("income", this.state.income);

      bodyFormData.append(
        "Profile[passportImage]",
        this.state.passport_img,
        this.state.passport_img.name
      );
      bodyFormData.append(
        "Profile[incomeImage]",
        this.state.income_img,
        this.state.income_img.name
      );

      axios({
        method: "post",
        url: mylink,
        data: bodyFormData,
        config: {
          headers: { "Content-Type": "multipart/form-data" }
        }
      })
        .then(response => {
          //handle success
        })
        .catch(function(response) {
          //handle error
          console.log(response);
        });

      // const rateLink = "https://hidden-oasis-96512.herokuapp.com/addRating";
      // const rateData = JSON.stringify({
      //   user_id: localStorage.getItem("userId"),
      //   rating: "",
      //   reserved: ""
      // });

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
        console.log(localStorage.getItem("status"));
        this.setState(
          {
            applied: true,
            isLoading: false
          },
          () => {
            if (this.state.applied === true) {
              setTimeout(function() {
                history.push("/personal");
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
      this.setState({
        editing: false
      });

      const ratingLink =
        "https://hidden-oasis-96512.herokuapp.com/updateRating";
      const ratingData = JSON.stringify({
        user_id: localStorage.getItem("userId"),
        rating: rating,
        reserved: reserved
      });

      axios({
        method: "post",
        url: ratingLink,
        data: ratingData,
        headers: { "content-type": "application/json" }
      })
        .then(response => {
          localStorage.setItem("rating", response.data[0].rating);
        })
        .catch(response => {
          console.log(response);
        });

      const mylink = `http://mycontract.uz/frontend/web/profile/update?id=${localStorage.getItem(
        "userId"
      )}`;
      const bodyFormData = new FormData();

      bodyFormData.set("user_id", localStorage.getItem("userId"));
      bodyFormData.set("first_name", this.state.first_name);
      bodyFormData.set("surname", this.state.surname);
      bodyFormData.set("birth", this.state.birth.format("DD/MM/YYYY"));
      bodyFormData.set("city_born", this.state.city_born);
      bodyFormData.set("region_current", this.state.region_current);
      bodyFormData.set("city_current", this.state.city_current);
      bodyFormData.set("district", this.state.district);
      bodyFormData.set("passport", this.state.passport);
      bodyFormData.set("given_by", this.state.given_by);
      bodyFormData.set(
        "given_date",
        this.state.given_date.format("DD/MM/YYYY")
      );
      bodyFormData.set("exp_date", this.state.exp_date.format("DD/MM/YYYY"));
      bodyFormData.set("phone", this.state.phone);
      bodyFormData.set("family_members", this.state.fm);
      bodyFormData.set("income", this.state.income);

      bodyFormData.append(
        "Profile[passportImage]",
        this.state.passport_img,
        this.state.passport_img.name
      );
      bodyFormData.append(
        "Profile[incomeImage]",
        this.state.income_img,
        this.state.income_img.name
      );

      axios({
        method: "post",
        url: mylink,
        data: bodyFormData,
        config: {
          headers: { "Content-Type": "multipart/form-data" }
        }
      })
        .then(response => {
          this.setState(
            {
              applied: true,
              isLoading: false
            },
            () => {
              window.scrollTo(0, 0);
              setTimeout(() => {
                this.setState({
                  applied: false
                });
                this.props.history.push("/personal");
              }, 3000);
            }
          );
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

  handleDateChange1 = event => {
    this.setState({
      birth: event
    });
  };
  handleDateChange2 = event => {
    this.setState({
      given_date: event
    });
  };
  handleDateChange3 = event => {
    this.setState({
      exp_date: event
    });
  };
  componentWillUnmount() {}
  componentDidUpdate(prop, state) {
    if (this.state.isLoading !== state.isLoading)
      this.props.loadme(this.state.isLoading);
  }
  render() {
    console.log("DidRender");
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
              Personal Information
            </h1>
            <form
              onSubmit={this.handleSubmit}
              className="col-md-8 offset-md-2 col mb-5"
            >
              <div className="row">
                <div className="addcard w-100 bg-white pb-5 mt-4">
                  <h1 className="w-100 pl-4 py-4">General information</h1>
                  <div className="mx-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <label className="pt-2" htmlFor="first_name">
                            Name <span>*</span>
                          </label>
                          <input
                            onChange={this.handleChange}
                            name="first_name"
                            type="text"
                            className="form-control"
                            id="first_name"
                            placeholder="John"
                            value={this.state.first_name}
                            disabled={myField}
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">Looks bad!</div>
                        </div>
                        <div>
                          <label className="pt-2" htmlFor="birth">
                            Date of birth <span>*</span>
                          </label>
                          <DatePicker
                            id="birth"
                            name="birth"
                            selected={this.state.birth}
                            onChange={this.handleDateChange1}
                            isClearable={!myField}
                            placeholderText="Please choose the date"
                            className="form-control"
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
                            Surname <span>*</span>
                          </label>
                          <input
                            onChange={this.handleChange}
                            name="surname"
                            type="text"
                            className="form-control"
                            id="surname"
                            placeholder="Doe"
                            disabled={myField}
                            value={this.state.surname}
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">Looks bad!</div>
                        </div>
                        <div>
                          <label className="pt-2" htmlFor="city_born">
                            City of birth <span>*</span>
                          </label>
                          <input
                            onChange={this.handleChange}
                            name="city_born"
                            type="text"
                            className="form-control"
                            id="city_born"
                            placeholder="Wonderland"
                            value={this.state.city_born}
                            disabled={myField}
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">Looks bad!</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="addcard w-100 bg-white pb-5 mt-4">
                  <h1 className="w-100 pl-4 py-4">Place of residence</h1>
                  <div className="mx-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <label className="pt-2" htmlFor="region_current">
                            Current region <span>*</span>
                          </label>
                          <input
                            onChange={this.handleChange}
                            name="region_current"
                            type="text"
                            className="form-control"
                            id="region_current"
                            placeholder="Tashkent region"
                            value={this.state.region_current}
                            disabled={myField}
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">Looks bad!</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          <label className="pt-2" htmlFor="city_current">
                            Current city <span>*</span>
                          </label>
                          <input
                            onChange={this.handleChange}
                            name="city_current"
                            type="text"
                            className="form-control"
                            id="city_current"
                            placeholder="Tashkent"
                            value={this.state.city_current}
                            disabled={myField}
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">Looks bad!</div>
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="pt-2" htmlFor="district">
                          District, house/apartment, block apartment{" "}
                          <span>*</span>
                        </label>
                        <input
                          onChange={this.handleChange}
                          name="district"
                          type="text"
                          className="form-control"
                          id="district"
                          placeholder="4-10a-2"
                          value={this.state.district}
                          disabled={myField}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">Looks bad!</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="addcard w-100 bg-white pb-5 mt-4">
                  <h1 className="w-100 pl-4 py-4">Personal information</h1>
                  <div className="mx-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <label className="pt-2" htmlFor="passport">
                            Passport number <span>*</span>
                          </label>
                          <input
                            onChange={this.handleChange}
                            name="passport"
                            type="text"
                            className="form-control"
                            id="passport"
                            placeholder="AA 1470000"
                            value={this.state.passport}
                            disabled={myField}
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">Looks bad!</div>
                        </div>
                        <div>
                          <label className="pt-2" htmlFor="given_date">
                            Given date <span>*</span>
                          </label>
                          <DatePicker
                            id="given_date"
                            name="given_date"
                            selected={this.state.given_date}
                            onChange={this.handleDateChange2}
                            isClearable={!myField}
                            placeholderText="Please choose the date"
                            className="form-control"
                            disabled={myField}
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">Looks bad!</div>
                        </div>
                        <div>
                          <label className="pt-2" htmlFor="fm">
                            Number of family memebers <span>*</span>
                          </label>
                          <input
                            onChange={this.handleChange}
                            name="fm"
                            type="number"
                            className="form-control"
                            id="fm"
                            placeholder="5"
                            value={this.state.fm}
                            disabled={myField}
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">Looks bad!</div>
                        </div>
                        <div>
                          <label className="pt-2" htmlFor="phone">
                            Phone number <span>*</span>
                          </label>
                          <input
                            onChange={this.handleChange}
                            name="phone"
                            type="number"
                            className="form-control"
                            id="phone"
                            placeholder="+1 475 032 6598"
                            value={this.state.phone}
                            disabled={myField}
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">Looks bad!</div>
                        </div>
                        <div className="file-part mt-3">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                id="inputGroupFileAddon01"
                              >
                                Upload
                              </span>
                            </div>
                            <div className="custom-file">
                              <input
                                onChange={this.handleFileSelected}
                                name="passport_img"
                                type="file"
                                className="custom-file-input"
                                id="passport_img"
                                aria-describedby="inputGroupFileAddon01"
                                disabled={myField}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="passport_img"
                              >
                                Passport scan
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          <label className="pt-2" htmlFor="given_by">
                            Personaled authority <span>*</span>
                          </label>
                          <input
                            onChange={this.handleChange}
                            name="given_by"
                            type="text"
                            className="form-control"
                            id="given_by"
                            placeholder="Yunusabad dist. IIB"
                            disabled={myField}
                            value={this.state.given_by}
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">Looks bad!</div>
                        </div>
                        <div>
                          <label className="pt-2" htmlFor="exp_date">
                            Expiration date <span>*</span>
                          </label>
                          <DatePicker
                            id="exp_date"
                            name="exp_date"
                            selected={this.state.exp_date}
                            onChange={this.handleDateChange3}
                            isClearable={!myField}
                            placeholderText="Please choose the date"
                            className="form-control"
                            disabled={myField}
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">Looks bad!</div>
                        </div>
                        <div>
                          <label className="pt-2" htmlFor="income">
                            Overall income (12 months) <span>*</span>
                          </label>
                          <input
                            onChange={this.handleChange}
                            name="income"
                            type="number"
                            className="form-control"
                            id="income"
                            placeholder="$7 566 321"
                            value={this.state.income}
                            disabled={myField}
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">Looks bad!</div>
                        </div>
                        <div className="file-part mt-3">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                id="inputGroupFileAddon01"
                              >
                                Upload
                              </span>
                            </div>
                            <div className="custom-file">
                              <input
                                onChange={this.handleFileSelected}
                                name="income_img"
                                type="file"
                                className="custom-file-input"
                                id="income_img"
                                aria-describedby="inputGroupFileAddon01"
                                disabled={myField}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="income_img"
                              >
                                Income statement
                              </label>
                            </div>
                          </div>
                        </div>
                        {submitButton}
                      </div>
                    </div>
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

export default Personal;
