import React from "react";
import { Container, Row, Spinner } from "reactstrap";
import { FaPencilAlt } from "react-icons/fa";
import NewsModel from "./NewsModel";
import NewsFeedBox from "./NewsFeedBox";
//import NewsPictureModel from "./NewsPictureModel";

// let Toaststyle = {
//   width: "900px",
//   height: "250px"
// };

let pencil = {
  width: "150px",
  size: "30"
};

class Newsfeed extends React.Component {
  state = {
    newsfeed: "",
    modalOpen: false,
    modalOpenPicture: false,
    dropdownOpen: false,
    isLoading: false
  };

  setModal = event => {
    event.preventDefault();

    if (this.state.modalOpen === true) {
      this.setState({
        modalOpen: false
      });
    } else if (this.state.modalOpen === false) {
      this.setState({
        modalOpen: true
      });
    }
  };

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
  componentDidMount = async () => {
    this.fetchingNews();
  };

  //componentDidUpdate = (prevProps,prevState) => {
  //if(this.state.newsfeed !== prevState.newsfeed) {
  //this.fetchingNews();
  //}
  //}

  fetchingNews = async () => {
    this.setState({ isLoading: true }); // setting to load
    console.log("i'm also called");
    let username = "user21";
    let password = "2ruxa4MRJdUgg6cz";
    let token = btoa(username + ":" + password);
    let response = await fetch("http://localhost:3002/posts", {
      method: "GET",
      headers: {
        Authorization: "Basic " + token
      }
    });
    let news = await response.json();
    this.setState({
      newsfeed: news.reverse(),
      isLoading: false // after loading is finished it disappear's
    });
  };

  render() {
    return (
      <>
        <Container flex id="newsfeed-toast">
          <div className="p-4 bg-info my-4 fluid">
            <div>
              {" "}
              {this.state.modalOpen && (
                <NewsModel
                  setmodal={this.setModal}
                  open={this.state.modalOpen}
                  fetchingNews={this.fetchingNews}
                />
              )}
            </div>
            {/* exportong the function(fetching news) to other components */}
            Post Your Idea's{" "}
            <FaPencilAlt size={25} style={pencil} onClick={this.setModal} />
          </div>
          {this.state.isLoading ? (
            <Spinner animation="border" />
          ) : (
            <Row>
              {" "}
              {this.state.newsfeed &&
                this.state.newsfeed.map((news, index) => (
                  <NewsFeedBox
                    fetchingNews={this.fetchingNews}
                    newsData={news}
                    key={index}
                  />
                ))}
            </Row>
          )}
        </Container>
      </>
    );
  }
}

export default Newsfeed;
