import styles from "./Comment.module.scss";
import {IComment} from "../../store/reducers/taskReducer";
import {ReactComponent as CommentIcon} from "../../assets/commentIcon.svg"
import {ReactComponent as SendIcon} from "../../assets/sendIcon.svg";
import Textarea from "../Textarea/Textarea";
import {DetailedHTMLProps, HTMLAttributes, useState} from "react";
import {IRenderComments} from "../TaskCard/TaskCard";


interface ICommentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  comment: IRenderComments
  addReplyComment: (comment: IComment) => void
  // replyComments: IComment[]
}

const Comment = ({comment, addReplyComment, ...props}: ICommentProps) => {

  const [replyComment, setReplyComment] = useState('')
  const [replyInputShow, setReplyInputShow] = useState(false)

  return (
    <div className={styles.wrapper} {...props}>

      <div>
        <CommentIcon className={styles.commentIcon}/>
        {comment.text}
      </div>

      <div className={styles.replyWrapper}>
        <span
          className={styles.replyBtn}
          onClick={() => setReplyInputShow(!replyInputShow)}
        >Ответить</span>
        <div className={styles.separator}></div>
      </div>

      {
        replyInputShow &&
				<div className={styles.replyInputWrapper}>
					<Textarea
						placeholder='Ответить...'
						className={styles.replyInput}
						value={replyComment}
						onChange={event => setReplyComment(event.target.value)}
					/>
					<SendIcon
						className={styles.sendIcon}
						onClick={() => {
              addReplyComment({id: crypto.randomUUID(), text: replyComment, isReply: comment.id})
              setReplyComment('')
              setReplyInputShow(false)
            }}
					/>
				</div>
      }

      {
        comment.children.length ? comment.children.map(child => <Comment className={styles.replyComment} key={crypto.randomUUID()} comment={child} addReplyComment={addReplyComment}/>) : null
      }

    </div>
  );
}

export default Comment;