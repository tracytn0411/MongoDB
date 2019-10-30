import React, {Component} from 'react';
import axios from 'axios';

class SavedBtn extends Component {

  constructor(props){
    super(props);
    this.state = {
      articleData: this.props.data_article,
      //count: this.props.value
      //articleID: this.props.value,
      //isSaved: this.props.data_isSaved,
      //text: this.props.data_text,
      //color: this.props.data_btn
    }
    this.handleSave = this.handleSave.bind(this)
  }
  
  //function to toggle 'Save Article' btn
  handleSave = (articleData) => {
    //e.preventDefault();
    var newsID = this.state.articleData._id
    console.log(newsID);

    if (!this.state.articleData.isSaved) { //when article is not saved -> save it
      axios.post(`/api/savedArticles`,{ // and update to mongo
        article_id: newsID
      })
      .then (res => {
        console.log('saved!')
        console.log(res.data)
        this.setState({ // then update react by update the its state
          articleData: res.data
        })
      })
    } else { //else -> unsave it
      axios.post(`/api/unsavedArticles`,{ // and update to mongo
        article_id: newsID
      })
      .then(res => {
        console.log('unsaved!')
        console.log(res.data)
        this.setState({
          articleData: res.data
        })
      })
    }
  };
 
  render() {
    const {articleData} = this.state
    return (
      <React.Fragment>
        <button
          //value={this.articleValue()}
          value={articleData._id}
          //onClick={article => {this.handleSave({ article: article });}}
          onClick={this.handleSave}
          //className={this.btnColor()}
          className = {'btn text-white btn-' + articleData.btnStyle}
        >
          {/* {this.btnText()} */}
          {articleData.btnText}
        </button>


        {/* <button
          //onClick={this.props.onDelete}
          onClick={() => this.props.onDelete(this.props.id)}
          className="btn btn-lg btn-outline-danger ml-4"
        >
          Delete
        </button> */}
      </React.Fragment>
    );
  }
 
  // articleValue() {
  //   let { articleID } = this.state
  //   return articleID;
  // }
  // btnColor() {
  //   let btnClass = 'btn text-white btn-' + this.state.color
  //   //btnClass += !this.state.isSaved ? 'secondary' : 'primary';
  //   return btnClass;
  // }
  // styleCardHeader() {
  //   let classes = "text-white bg-";
  //   classes += this.state.count === 0 ? "warning" : "primary";
  //   return classes;
  // }
 
  // btnText() {
  //   const { text } = this.state;
  //   return text;
  // }
  // constructor(props){
  //     super(props);
  //     this.state = {
  //         person: this.props.person
  //     }
  // }
  
  // buttonActiveHandler = () => {
  //     let oldStatus = this.props.person.status;
  //     this.props.person.status = (!oldStatus ? 'active': '');
  //     this.setState({
  //         person:this.props.person
  //     });
  // }
  // render() {
  //     return (
  //         <button className={this.state.person.status} onClick={this.buttonActiveHandler}>{this.state.person.name}</button>
  //     );
  // }
  }
  export default SavedBtn;

  