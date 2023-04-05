import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {Comment, toggleIsLiked, toggleIsDelete} = props
  const {id, name, comment, date, isLiked, initialClassName} = Comment

  const onClickLike = () => {
    toggleIsLiked(id)
  }
  const onClickDelete = () => {
    toggleIsDelete(id)
  }

  const imgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const buttonStyle = isLiked ? 'liked-button' : 'like-button'

  return (
    <>
      <li className="commentList">
        <div className="profile-container">
          <h1 className={`profile ${initialClassName}`}>{name[0]}</h1>
          <div>
            <div className="username-container">
              <h1 className="username">{name}</h1>
              <p className="time">{formatDistanceToNow(date)}</p>
            </div>
            <p className="comment">{comment}</p>
          </div>
        </div>
        <div className="like-delete-container">
          <button onClick={onClickLike} type="button" className={buttonStyle}>
            <img src={imgUrl} className="like-image" alt="like" />
            Like
          </button>
          <button
            className="delete-button"
            onClick={onClickDelete}
            data-testid="delete"
            type="button"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
              className="delete-image"
            />
          </button>
        </div>
      </li>
      <hr className="L-break" />
    </>
  )
}

export default CommentItem
