import Button from "react-bootstrap/Button"
import React, { Component } from "react";
import "./CommentButton.css"
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineEnter } from "react-icons/ai";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default class CommentButton extends Component {
    constructor(props) {
        super(props);
        // this.state = { items: [], text: '', showForm: false };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleCommentClick = this.handleCommentClick.bind(this);
        // this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    // handleCommentClick () {
    //   if(!this.state.showForm) {
    //     this.setState({...this.state, showForm: true});
    //   } else {
    //     this.setState({...this.state, showForm: false});
    //   }
    // }

    // handleChange(e) {
    //   this.setState({ text: e.target.value });
    // }

    // handleSubmit(e) {
    //   e.preventDefault();
    //   if (this.state.text.length === 0) {
    //     return;
    //   }
    //   const newItem = {
    //     text: this.state.text,
    //     id: Date.now()
    //   };
    //   this.setState(state => ({
    //     items: state.items.concat(newItem),
    //     text: ''
    //   }));
    // }

    render() {
        return (
            <div>
                <OverlayTrigger
                    placement="top"
                    // delay={{ show: 250, hide: 400 }}
                    overlay={
                        <Tooltip id="button-tooltip" >
                            Comments
                        </Tooltip>
                    }
                >
                    {/* <Button className="comment" onClick={this.handleCommentClick}> */}
                    <Button>
                        <AiOutlineComment size={16} />
                    </Button>
                </OverlayTrigger>

                {/* {this.state.showForm && (
                    <>
                        {"\n"}
              Leave your Comments Below
                        <textarea
                            id="new-todo"
                            onChange={this.handleChange}
                            value={this.state.text}>
                        </textarea>
                        <form onSubmit={this.handleSubmit}>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={
                                    <Tooltip id="button-tooltip" >
                                        Post
                  </Tooltip>}
                            >
                                <button>
                                    <AiOutlineEnter size={13} />
                                </button>
                            </OverlayTrigger>

                        </form>
                        <Comments items={this.state.items} />
                    </>
                )} */}
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