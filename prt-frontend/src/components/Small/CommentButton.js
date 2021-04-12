import Button from "react-bootstrap/Button"
import React, {Component} from "react";
import "./CommentButton.css"
import { AiOutlineComment } from "react-icons/ai";


export default class CommentButton extends Component {
    constructor(props) {
      super(props);
      this.state = { items: [], text: '', showForm: false};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleCommentClick = this.handleCommentClick.bind(this);
      // this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    handleCommentClick () {
      if(!this.state.showForm) {
        this.setState({...this.state, showForm: true});
      } else {
        this.setState({...this.state, showForm: false});
      }
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

    render() {
      return (
        <div>
          <Button className = "comment" onClick={this.handleCommentClick}>
            <AiOutlineComment size = {16}/>
          </Button> 
          {this.state.showForm && (
          <>
              <h3>Leave your Comments Below</h3>
              <textarea 
                id="new-todo"
                onChange={this.handleChange}
                value={this.state.text}> 
              </textarea>
              <form onSubmit={this.handleSubmit}>
                <Button className="button-margin" onClick={this.handleSubmit}>
                  Post
                </Button>
              </form>
              <Comments items={this.state.items} />
            </>
          )} 
        </div>
      );
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