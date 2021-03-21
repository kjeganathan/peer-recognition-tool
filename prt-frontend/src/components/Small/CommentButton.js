import React, {Component} from "react";
import "./CommentButton.css"

export default class CommentButton extends Component {
    constructor(props) {
      super(props);
      this.state = { items: [], text: '', showForm: false};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleCommentClick = this.handleCommentClick.bind(this);
    }

    handleCommentClick () {
      this.setState({...this.state, showForm: true});
    }

    render() {
      return (
        <div>
          <button onClick={this.handleCommentClick}>
            Comment
          </button> 
          {this.state.showForm && (
          <>
              <h3>Leave your Comments Below</h3>
              <Comments items={this.state.items} />
              <textarea className = "comment"
                id="new-todo"
                onChange={this.handleChange}
                value={this.state.text}
              />
              <form onSubmit={this.handleSubmit}>
                <button>
                  Post
                </button>
              </form>
            </>
          )} 
        </div>
      );
    }
  
    handleChange(e) {
      this.setState({ text: e.target.value });
    }
  
    handleSubmit(e) {
      e.preventDefault();
      if (this.state.text.length === 0) {
        return;
      }
      const newItem = {
        text: this.state.text,
        id: Date.now()
      };
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: ''
      }));
    }
  }
  
 class Comments extends Component {
    render() {
      return (
        <ula>
          {this.props.items.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ula>
      );
    }
  }