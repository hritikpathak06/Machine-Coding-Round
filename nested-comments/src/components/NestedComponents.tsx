import React, { useState } from "react";
import useCommentTree from "../hooks/useCommentTree";
import CommentCard from "./CommentCard";

type NestedComponentsProps = {
  comments: any;
  onSubmit?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

const NestedComponents: React.FC<NestedComponentsProps> = ({
  comments,
  onSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const { comments: commentsData,insertComment } = useCommentTree(comments);
  const [comment, setComment] = useState<string>("");

  const handleTextAreaChange = (e: any) => {
    setComment(e.target.value);
  };

  const handleSubmitBtn = () => {
    if (comment) {
      // Logic
      handleReply(undefined,comment)

      setComment("");
    }
  };

  const handleReply = (commentId:any,content:any) =>{
       insertComment(commentId,content)
  }

  return (
    <div>
      {/* <h1>Nested Component</h1> */}
      <div className=" add-comment">
        <textarea
          value={comment}
          name=""
          id=""
          placeholder="Add a new comment"
          rows={3}
          cols={30}
          className="comment-textarea"
          onChange={handleTextAreaChange}
        />
        <button className="comment-button" onClick={handleSubmitBtn}>
          Add Comments
        </button>
      </div>
      {commentsData.map((comment: any) => (
        <CommentCard key={comment.id} comment={comment} onSubmitComment={handleReply} />
      ))}
    </div>
  );
};

export default NestedComponents;
