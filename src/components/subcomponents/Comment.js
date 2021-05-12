import { useState } from 'react'
import { fetchApi } from '../helpers/Fetching'
import NewComment from './NewComment'
import EditComment from './EditComment'
import UserDisplay from './UserDisplay'
import AttributeList from './AttributeList'
import OptionList from './OptionList'

function Comment(props) {

  const { parent, comment, currentUserId } = props;
  const [replies, setReplies] = useState([]);
  const [repliesView, setRepliesView] = useState(false);
  const [edit, setEdit] = useState(false);

  async function handleShowReplies() {
    if (replies.length === 0) {
      const path = '/comments/C' + comment.id;
      const newReplies = await fetchApi(path, 'GET');
      setReplies(newReplies);
    }
    setRepliesView(!repliesView);
  }

  function handleToggleEdit() {
    setEdit(!edit);
  }

  async function handleNewComment(data) {
    data.commentable_id = comment.id;
    data.commentable_type = 'Comment';
    const newComment = await fetchApi('/comments', 'POST', data);
    setReplies([...replies, newComment]);
    props.onUpdateCommentCounter(newComment.commentable_id, 1);
    if (!repliesView) handleShowReplies();
  }

  async function handleEditComment(edit, id) {
    if (parent === 'Post') {
      props.onEditComment(edit, id);
    }
    else {
      const path = '/comments/' + id;
      const comment = await fetchApi(path, 'PUT', edit);
      props.onUpdateReplies(comment);
    }
    setEdit(!edit);
  }

  async function handleDeleteComment() {
    if (parent === 'Post') {
      const value = -1 - comment.comments_count;
      props.onDeleteComment(comment.id, value);
      props.onUpdateCommentCounter(comment.id, -1);
    }
    else {
      const path = '/comments/' + comment.id;
      await fetchApi(path, 'DELETE');
      props.onUpdateReplies(comment.id);
      props.onUpdateCommentCounter(comment.commentable_id, -1);
    }
  }

  function updateReplies(par) {
    if (typeof par === 'number') {
      setReplies(replies.filter(reply => reply.id !== par));
    } else {
      setReplies(replies.map(reply => reply.id === par.id ? par : reply));
    }
  }

  function handleUpdateLikeCounter(commentId, likeId) {
    const value = likeId ? 1 : -1;
    setReplies(replies.map(comment => {
      return comment.id === commentId ? 
        { ...comment, like_id: likeId, likes_count: comment.likes_count + value } : comment;
    }));
  }

  async function handleLike() {
    const data = {
      likeable_id: comment.id,
      likeable_type: 'Comment'
    };
    const newLike = await fetchApi('/likes', 'POST', data);
    props.onUpdateLikeCounter(comment.id, newLike.id);
  }

  async function handleUnlike() {
    const path = '/likes/' + comment.like_id;
    await fetchApi(path, 'DELETE');
    props.onUpdateLikeCounter(comment.id, false);
  }

  const commentForm = (
    <EditComment
      parent={parent}
      comment={comment} 
      onEditComment={handleEditComment}/>
  );

  const commentView = (
    <div className='comment-view'>
      <p className='content'>{comment.content}</p>
    </div>
  );

  const replyList = replies.map(reply => {
    return <Comment 
      key={reply.id} 
      parent='Comment'
      comment={reply}
      currentUserId={currentUserId}
      onEditComment={handleEditComment}
      onDeleteComment={handleDeleteComment}
      onUpdateReplies={updateReplies}
      onUpdateCommentCounter={(id, value) => {props.onUpdateCommentCounter(id, value)}}
      onUpdateLikeCounter={handleUpdateLikeCounter}/>
  });

  return (
    <li className="comment">
      <UserDisplay data={comment}/>
      {edit ? commentForm : commentView}
      <AttributeList
        id={comment.id}
        entity={'comment'}
        parent={parent}
        likesCount={comment.likes_count}
        commentsCount={comment.comments_count}
        date={comment.created_at}
        onShowChildren={handleShowReplies}/>
      <OptionList
        entity={'comment'}
        edit={edit}
        editable={currentUserId === comment.user_id}
        likeable={comment.like_id}
        onToggleEdit={handleToggleEdit}
        onDelete={handleDeleteComment}
        onLike={handleLike}
        onUnlike={handleUnlike}/>
      {repliesView && <ul>{replyList}</ul>}
      {comment.commentable_type === 'Post' &&
        <NewComment 
          parent='Comment'
          onNewComment={handleNewComment}/>}
    </li>
  );
}

export default Comment;
