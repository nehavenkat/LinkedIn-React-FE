import React, { Component } from "react";
import { Toast, ToastBody, ToastHeader, Col } from "reactstrap";
import { FaBars, FaTrash } from "react-icons/fa";
import NewsPictureModel from "./NewsPictureModel";
import { FaCameraRetro } from "react-icons/fa";
let Toaststyle = {
  width: "100%",
  height: "400px",
  padding: "5px",
  margin: "5px"
};

let camera = {
  width: "50px"
};
class NewsFeedBox extends Component {
  state = {
    isDelete: false,
    modalOpenPicture: false
  }; // we are doing this to make the delete work autonmatically withouy refreshing the page

  setModalPicture = event => {
    event.preventDefault();

    if (this.state.modalOpenPicture === true) {
      this.setState({
        modalOpenPicture: false
      });
    } else if (this.state.modalOpenPicture === false) {
      this.setState({
        modalOpenPicture: true
      });
    }
  };
  delete = async () => {
    let username = "user21";
    let password = "2ruxa4MRJdUgg6cz";
    let token = btoa(username + ":" + password);
    let response = await fetch(
      "https://striveschool.herokuapp.com/api/posts/" + this.props.newsData._id,
      {
        method: "DELETE",
        headers: {
          authorization: "Basic " + token
        }
      }
    );
    console.log(response);
    this.setState({ isDelete: true });
    return response;
  };
  fetchingNews = () => {
    console.log("i'm called");
    this.props.fetchingNews();
  };
  render() {
    return this.state.isDelete === false ? (
      <Col md="3">
        <Toast style={Toaststyle}>
          <div className="mx-5 float-right">
            <FaCameraRetro style={camera} onClick={this.setModalPicture} />
            <FaTrash onClick={this.delete} />
          </div>
          <ToastHeader>
            <div>{this.props.newsData.profileID[0].username}</div>
          </ToastHeader>
          <ToastBody>
            {this.props.newsData.text}
            <img
              style={{ width: "100%" }}
              src={this.props.newsData.imagePost}
            />
          </ToastBody>
          <NewsPictureModel
            postId={this.props.newsData._id}
            fetchingNews={this.fetchingNews}
            setModalPicture={this.setModalPicture}
            open={this.state.modalOpenPicture}
          />
        </Toast>
      </Col>
    ) : (
      " "
    );
  }
}

export default NewsFeedBox;
