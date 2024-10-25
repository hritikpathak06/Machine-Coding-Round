import { useState } from "react";

const useCommentTree = (initialComments: any) => {
  const [comments, setCommnets] = useState(initialComments);

  return {
    comments,
  };
};

export default useCommentTree;
