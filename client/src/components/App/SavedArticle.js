import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
//import SavedArticleList from "./SavedArticlesList";
import CollapseBtn from "./CollapseBtn";
import axios from "axios";

class SavedArticle extends Component {
  handleUnsave() {
    const articleID = this.props.article._id;
    axios
      .post(`/api/unsavedArticles`, {
        article_id: articleID
      })
      .then(res => {
        const savedArticles = res.data.savedArticles
        console.log(savedArticles)
        this.props.onUnsave(savedArticles)
      });
  }

  render() {
    const article = this.props.article;
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
          <Button onClick={this.handleUnsave.bind(this)}>Saved!</Button>
          <CollapseBtn articleID={article._id} />
        </Card.Footer>
      </Card>
    );
  }
}

export default SavedArticle;
