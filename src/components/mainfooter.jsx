import React, { Component } from "react";
import { Container, Row } from "reactstrap";

class MainFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <footer className="text-center text-center d-flex justify-items-center align-items-center footer">
        <Container>
          <Row>
            <p className="w-100 mb-0">
              © Percentera 2018. All rights reserved.
            </p>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default MainFooter;
