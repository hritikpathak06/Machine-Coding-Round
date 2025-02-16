import React, { useState } from "react";

const Comment = ({ comment, onSubmitComment }: any) => {
  const [expand, setExpand] = useState(false);
  const [replyContent, setReplyContent] = useState<any>("");

  const handleReplyChange = (e: any) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = () => {
    if (replyContent) {
      onSubmitComment(comment.id, replyContent);
    }
    setReplyContent("");
  };

  function toggleExpand() {
    setExpand(!expand);
  }

  return (
    <>
      <div className="comment">
        <p className="comment-content">{comment.content}</p>
        <p className="comment-info">{comment.votes}</p>
        <p className="comment-info">
          {new Date(comment.timestamp).toLocaleString()}
        </p>

        <div className="comment-actions">
          <button className="comment-button" onClick={toggleExpand}>
            {expand ? "Hide Replies" : "Reply"}
          </button>
          <button className="comment-button">Edit</button>
          <button className="comment-button">Delete</button>
        </div>

        {expand && (
          <div className="comment-replies">
            <div className="add-comment">
              <textarea
                name=""
                id=""
                rows={2}
                cols={50}
                value={replyContent}
                onChange={handleReplyChange}
                className="comment-textarea"
              ></textarea>
              <button className="comment-button" onClick={handleReplySubmit}>
                Add Comment
              </button>
            </div>
            {comment?.replies?.map((data: any) => {
              return (
                <Comment
                  key={data.id}
                  comment={data}
                  onSubmitComment={onSubmitComment}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;
