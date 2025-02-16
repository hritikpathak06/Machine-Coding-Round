import { useState } from "react";

export const useComment = (initialComments: any) => {
  const [comments, setComments] = useState<any>(initialComments || []);

  const insertNode = (tree: any, commentId: any, content: any) => {
    return tree.map((comment: any) => {
      if (!comment) return comment;
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), content],
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

  const insertComment = (commentId: any, content: any) => {
    const newComment = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId) {
      setComments((prev: any) => insertNode(prev, commentId, newComment));
    } else {
      setComments((prev: any) => [newComment, ...prev]);
    }
  };

  const editNode = (tree: any, commentId: any, content: any) => {
    return tree.map((comment: any) => {
      if (!comment) return comment;
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), content],
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

  const editComment = (commentId: any, content: any) => {


    if (commentId) {
      setComments((prev: any) => insertNode(prev, commentId, newComment));
    } else {
      setComments((prev: any) => [newComment, ...prev]);
    }
  };


  return { comments, insertComment };
};
