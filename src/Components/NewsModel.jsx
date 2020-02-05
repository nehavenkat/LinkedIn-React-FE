  import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

class  NewsModel extends React.Component {
  intervalId;
    state = {
      modalOpen: true,
      setModel: false,
      text: '',
      isPost: false,
      // We are doing this to make the "POST" work autonmatically without refreshing the page
  }

      setModal = () => {
      if(this.state.modalOpen === true){
        this.setState({
              modalOpen: false
          })
      } else if (this.state.modalOpen === false){
          this.setState({
          modalOpen: true
          })
      }
  }

  handleFile(e){
    this.setState({selectedFile: e.target.files[0]})

}
   
fileUpload = (postId) =>{
  let username = "user21"
      let password = "2ruxa4MRJdUgg6cz"
      let token = btoa(username + ":" + password)
      const url= "https://striveschool.herokuapp.com/api/posts/" + postId
      const body =new FormData();
      body.append('post',this.state.selectedFile)
      const request = new XMLHttpRequest();
      request.open("POST",url );
      request.setRequestHeader( "Authorization", "Basic " + token );
      request.onload = ()=> this.props.fetchingNews();
      request.send(body);
      this.setState({
        modalOpenPicture: false
    })
    }
  post = async() => {
    let obj = {
      text: this.state.text
    }
    if(this.state.text.length > 2){
      let username = "user21";
      let password = "2ruxa4MRJdUgg6cz";
      let token = btoa(username + ":" + password);
      let response = await fetch(
        "https://striveschool.herokuapp.com/api/posts/",{
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "authorization": "Basic " + token,
            "Content-Type": "application/json",
          }
        }
      )
      const post = await response.json() //
      if(this.state.selectedFile){
        this.fileUpload(post._id)
      }
      console.log(response)
      this.setState({isPost: true})
      this.props.fetchingNews()// this is function from Newsfeed importing to this Component so that refreshing is not needed 
      return response// and this.props is used when we import from other component
    }
  }
  render(){
    return this.state.isPost === false? ( 
        <Modal isOpen={this.props.open} toclose={this.props.close} >
          <ModalHeader color="blue">Enter Text</ModalHeader>
          <ModalBody>
          Your Text
          <Input type="text" name="text" onChange={(data) =>{this.setState({ text: data.target.value }) }} />
          <Input type="file" name="file" onChange={(e) => this.handleFile(e)}/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.setModel} color="primary">Close</Button>
            <Button  onClick={this.post} color="primary">Post</Button>
          </ModalFooter>
        </Modal>
        ): ("");
 }
}
export default NewsModel;

