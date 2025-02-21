import { useState } from "react";
import data from "../../data/component.json";
import "./index.css";

const CommentBox = ({ data, addReply, editReply, deleteReply }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="main_div">
      <div className="comment_card">
        <div>
          <h3>{data.content}</h3>
        </div>
        <div className="btn_comp">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addReply(data.id);
            }}
          >
            Reply
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              editReply(data.id);
            }}
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteReply(data.id);
            }}
          >
            Delete
          </button>
          {data.replies.length > 0 && (
            <button onClick={() => setIsExpanded((prev) => !prev)}>
              {isExpanded ? "Hide Replies" : "Show Replies"}
            </button>
          )}
        </div>

        {isExpanded && (
          <div className="nested_comments">
            {data.replies.map((reply: any) => (
              <CommentBox
                key={reply.id}
                data={reply}
                addReply={addReply}
                editReply={editReply}
                deleteReply={deleteReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CommentCard = () => {
  const [comments, setComments] = useState(data);

  const addReply = (commentId: number) => {
    const replyText = prompt("Enter Reply");
    if (!replyText) return;

    const new_reply = {
      id: Date.now(),
      content: replyText,
      votes: 5,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    const updated_data = (comments: any[]): any[] => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, new_reply],
          };
        } else if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: updated_data(comment.replies),
          };
        }
        return comment;
      });
    };

    setComments((prevComments) => updated_data(prevComments));
  };

  const editReply = (commentId: number) => {
    console.log("Function Called==>> ");

    const replyText = prompt("Enter Reply");
    if (!replyText) return;

    const updated_data = (comments: any[]): any[] => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            content: replyText,
            replies: [...comment.replies],
          };
        } else if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: updated_data(comment.replies),
          };
        }
        return comment;
      });
    };

    setComments((prevComments) => updated_data(prevComments));
  };

  const deleteReply = (commentId: number) => {
    const updated_data = (comments: any[]): any[] => {
      return comments
        .filter((comment) => comment.id !== commentId)
        .map((comment) => ({
          ...comment,
          replies: updated_data(comment.replies),
        }));
    };

    setComments((prevComments) => updated_data(prevComments));
  };

  return (
    <>
      <div>
        <h1>Nested Comment</h1>
        {comments.map((comment) => {
          return (
            <>
              <CommentBox
                data={comment}
                addReply={addReply}
                editReply={editReply}
                deleteReply={deleteReply}
              />
            </>
          );
        })}
      </div>
    </>
  );
};

export default CommentCard;
