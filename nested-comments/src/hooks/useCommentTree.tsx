import { useState } from "react";

const useCommentTree = (initialComments: any) => {
  const [comments, setCommnets] = useState(initialComments);

  const insertComment = (commentId: any, content: any) => {
    const newComment = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    const insertNode = (tree: any, commentId: any, content: any) => {
      return tree.map((comment: any) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, content],
          };
        } else if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: insertNode(comment.replies, commentId, content),
          };
        }
        return comment;
      });
    };

    if (commentId) {
      setCommnets((prevComments: any) =>
        insertNode(prevComments, commentId, newComment)
      );
    } else {
      setCommnets((prevComments: any) => [newComment, ...prevComments]);
    }
  };

  return {
    comments,
    insertComment
  };
};

export default useCommentTree;
