import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {commentsList: [], nameInput: '', commentInput: ''}

  onChangeUserName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeComment = event => {
    this.setState({commentInput: event.target.value})
  }

  onClickAddCommentButton = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  toggleIsDelete = id => {
    const {commentsList} = this.state
    const filteredCommentsList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentsList: filteredCommentsList})
  }

  render() {
    const {commentsList, nameInput, commentInput} = this.state

    return (
      <div className="bg-container">
        <div className="comment-container">
          <h1 className="heading">Comments</h1>
          <div className="sub-container">
            <form
              className="input-container"
              onSubmit={this.onClickAddCommentButton}
            >
              <p className="C-paragraph">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="name-input"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeUserName}
              />
              <textarea
                type="text"
                className="comment-input"
                placeholder="Your Comment"
                value={commentInput}
                onChange={this.onChangeComment}
              />
              <button className="button" type="submit">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="comment-image"
              alt="comments"
            />
          </div>
        </div>
        <hr className="break" />
        <div className="commentItems-container">
          <div className="commentsCount-container">
            <p className="count">{commentsList.length}</p>
            <p className="paragraph">Comments</p>
          </div>
          <ul className="commentsList-container">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                Comment={eachComment}
                toggleIsLiked={this.toggleIsLiked}
                toggleIsDelete={this.toggleIsDelete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
