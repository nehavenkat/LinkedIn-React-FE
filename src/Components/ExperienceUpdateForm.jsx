import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

class ExperienceUpdateForm extends React.Component {
  state = {
    experiences: "",
    closeModal: false,
    isSubmitted: false,
    formData: {
      username: "Neha"
    }
  };
  updateObj = ev => {
    let input = ev.target.value;
    let idInput = ev.target.id;
    let newFormData = this.state.formData;
    newFormData[ev.target.id] = ev.target.value;
    this.setState({ formData: newFormData });
    console.log(this.state);
  };

  handleSubmit = async event => {
    event.preventDefault();
    let username = "user16";
    let password = "c9WEUxMS294hN6fF";
    let token = btoa(username + ":" + password);

    console.log(this.state.formData);
    let response = await fetch("http://localhost:3002/experiences", {
      method: "POST",
      body: JSON.stringify(this.state.formData),
      headers: {
        Authorization: "Basic " + token,
        "Content-Type": "application/json"
      }
    });
    console.log("response from server", response);
    this.props.closeModal(this.props.passAsParam);
    // this.setState({ closeModal: true });
  };

  render() {
    return (
      <div className="modal-div">
        <div className="flex md-4 mr-5">
          <img
            className="modal-bg"
            src="https://miro.medium.com/max/1124/1*92adf06PCF91kCYu1nPLQg.jpeg"
            alt="linkedIn background"
          ></img>
        </div>
        <Form className="update-form" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="examplePassword">Role</Label>
            <Input
              type="text"
              onChange={this.updateObj}
              name="password"
              id="role"
              placeholder="role of employe?"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Company</Label>
            <Input
              type="email"
              onChange={this.updateObj}
              name="email"
              id="company"
              placeholder="What was your company?"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Start Date</Label>
            <Input
              type="date"
              onChange={this.updateObj}
              name="password"
              id="startDate"
              placeholder="Date you started?"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Last Date</Label>
            <Input
              type="date"
              onChange={this.updateObj}
              name="password"
              id="lasteDate"
              placeholder="What was your LastDate"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Description</Label>
            <Input
              type="text"
              onChange={this.updateObj}
              name="password"
              id="description"
              placeholder="Briefly describe your role"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Area</Label>
            <Input
              type="text"
              onChange={this.updateObj}
              name="password"
              id="area"
              placeholder="Location of employment"
            />
          </FormGroup>
          {/* <FormGroup>
            <Label for="user">UserName</Label>
            <Input
              type="text"
              onChange={this.updateObj}
              name="user"
              id="username"
              placeholder="username"
            />
          </FormGroup> */}
          <Button
            type="submit"
            className="btn btn-success"
            value="Submit"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
          <Button
            type="exit"
            class="btn btn-danger"
            value="Exit"
            onClick={this.props.closeModal}
          >
            Exit
          </Button>
        </Form>
      </div>
    );
  }
}

export default ExperienceUpdateForm;
