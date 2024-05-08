import { LoginContext } from "../contexts/LoginContext";
import { useContext, useState } from "react";

import { deleteComment } from "../api";

import dateFormat from "dateformat";
import moment from "moment";
moment().format();

function CommentCard({ comment , onDelete}) {
  const date = dateFormat(comment.created_at, "isoDate");
  const howLongAgo = moment(date, "YYYYMMDD").fromNow();

  const { loggedUser } = useContext(LoginContext);

  if (!comment.author) {
    comment.author = loggedUser.username;
  }

  const handleClick = () => {
    console.log(comment.comment_id)
    console.log("clicked")
    onDelete(comment.comment_id)
    deleteComment(comment.comment_id)
  };

  return (
    <div className="commentCard">
      <>
        {comment.author} . {howLongAgo}
      </>
      {comment.author === loggedUser.username ? (
        <div onClick={handleClick}><button>x</button></div>
      ) : null}
      <p>{comment.body}</p>
      <img src="https://i.ibb.co/7Wvj2Pm/votes.png" />
      {comment.votes}
    </div>
  );
}

export default CommentCard;
