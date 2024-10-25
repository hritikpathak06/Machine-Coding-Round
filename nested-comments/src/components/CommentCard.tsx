import React from "react";

type CommentCardProps = {
  comment: any;
  onSubmitComment: (id: string) => void;
};

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  onSubmitComment,
}) => {
  return (
    <div>
      <h2>{comment.id}</h2>
      <p>{comment.content}</p>
      <button onClick={() => onSubmitComment(comment.id)}>Reply</button>
    </div>
  );
};

export default CommentCard;
