import { useState } from "react";

type CommentCardProps = {
  comment: any;
  onSubmitComment: any;
};

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  onSubmitComment,
}) => {
  const [expand, setExpand] = useState<boolean>(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const [replyContent, setReplyContent] = useState<string>("");

  const handleTextAreaChange = (e: any) => {
    setReplyContent(e.target.value);
  };

  const handleRepliesSubmit = () => {
    if (replyContent) {
      // Logic
      onSubmitComment(comment.id, replyContent);
      setReplyContent("");
    }
  };

  return (
    <div className=" comment">
      <p className=" comment-content">{comment.content}</p>
      <p className=" comment-info">Votes: {comment.votes}</p>
      <p className=" comment-info">
        {new Date(comment.timestamp).toLocaleString()}
      </p>

      <div className="comment-actions">
        <button className="comment-button" onClick={toggleExpand}>
          {expand ? "Hid replies" : "Reply"}
        </button>
        <button className="comment-button">Edit</button>
        <button className="comment-button">Delete</button>
      </div>
      {expand && (
        <div className="comment-replies">
          <div className=" add-comment">
            <textarea
              value={replyContent}
              name=""
              id=""
              placeholder="Add a new comment"
              rows={3}
              cols={30}
              className="comment-textarea"
              onChange={handleTextAreaChange}
            />
            <button className="comment-button" onClick={handleRepliesSubmit}>
              Add Comments
            </button>
          </div>
          {comment?.replies?.map((reply: any) => {
            return (
              <CommentCard
                key={reply.id}
                comment={reply}
                onSubmitComment={onSubmitComment}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
