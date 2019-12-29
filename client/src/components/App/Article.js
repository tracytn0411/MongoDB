import React, { Component } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import CollapseBtn from "./CollapseBtn";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: this.props.article
    };
    this.handleToggleSave = this.handleToggleSave.bind(this);
  }

  //function to toggle 'Save Article' btn
  handleToggleSave = () => {
    const article = this.state.article;
    const newsID = article._id;
    const isSaved = article.isSaved;
    console.log(newsID);

    if (!isSaved) {
      //when article is not saved -> save it
      axios
        .post(`/api/savedArticles`, {
          // and update to mongo
          article_id: newsID
        })
        .then(res => {
          console.log("saved!");
          console.log(res.data);
          this.setState({
            // then update button style by update the its react state
            article: res.data
          });
        });
    } else {
      //else -> unsave it
      axios
        .post(`/api/unsavedArticles`, {
          // and update to mongo
          article_id: newsID
        })
        .then(res => {
          console.log("unsaved!");
          const unsavedArticle = res.data.unsavedArticle
          console.log(unsavedArticle);
          this.setState({
            article: unsavedArticle
          });
        });
    }
  };

  render() {
    const {article} = this.state;
    return (
      <Card className="mb-2">
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>
            <span>{article.date}</span>
            {article.summary}
          </Card.Text>
          <Card.Link href={article.link} target="_blank">
            Read more...
          </Card.Link>
        </Card.Body>
        <Card.Footer className="text-right">
          <Button
            onClick={this.handleToggleSave.bind(this)}
            className={"btn text-white btn-" + article.btnStyle}
          >
            {article.btnText}
          </Button>
          <CollapseBtn articleID={article._id} />
        </Card.Footer>
      </Card>
    );
  }
}
export default Article;
