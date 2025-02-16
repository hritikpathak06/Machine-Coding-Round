import React, { useState } from "react";
import { useComment } from "../../hooks/useComment";
import Comment from "./Comment";

const Nested = ({
  comments,
  onSubmit,
  onEdit,
  onDelete,
  onUpvote,
  onDownVote,
}: any) => {
  const { comments: commentsData, insertComment } = useComment(comments);
  const [comment, setComment] = useState<any>("");

  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment) {
      handleReply(undefined, comment);
    }
    setComment("");
  };

  const handleReply = (commentId: any, content: any) => {
    insertComment(commentId, content);
  };

  console.log("Custom Dtaa==>> ", commentsData);

  return (
    <>
      <div className="add-comment">
        <textarea
          name=""
          id=""
          rows={2}
          cols={50}
          value={comment}
          onChange={handleCommentChange}
          className="comment-textarea"
        ></textarea>
        <button className="comment-button" onClick={handleSubmit}>
          Add Comment
        </button>
      </div>
      <div>
        {commentsData.map((comment: any) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              onSubmitComment={handleReply}
            />
          );
        })}
      </div>
    </>
  );
};

export default Nested;
