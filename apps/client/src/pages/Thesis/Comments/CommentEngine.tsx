import { useMemo } from "react";
import { CommentComponent } from "@pg/Thesis/Comments/CommentComponent";

export const CommentEngine = ({comments}) => {

  if (!comments.length || !comments) {
    return (
      <div>У работы еще нет комментариев. Начните обсуждение первым!</div>
    )
  }

  const commentsByParentId = useMemo(() => {
    if (!comments || !comments.length) {
      return {}
    }

    const group = {}
    comments.forEach(comm => {
      group[comm.parent_id] ||= []
      group[comm.parent_id].push(comm)

    return group
  })}, [comments]);

  function getReplies(parent_id) {
    console.log(commentsByParentId[parent_id])
    return commentsByParentId[parent_id]
  }



  // TODO: добавить нестинг
  //


  return (
    <div className={'mt-4'}>
      {comments.map(comment =>
        (
          <div key={comment.id}>
          <CommentComponent comment={comment}/>
        </div>
        )
      )}
    </div>
  )

};
