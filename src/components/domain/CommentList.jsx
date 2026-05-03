import { useComments } from '../../hooks/usePosts';
import Loader from '../ui/Loader';
import styles from './CommentList.module.css';

export default function CommentList({ postId }) {
  const { data: comments, isLoading, isError } = useComments(postId);

  if (isLoading) return <Loader />;
  if (isError) return <div className={styles.error}>Failed to load comments.</div>;

  return (
    <div className={styles.container}>
      {comments?.length === 0 ? (
        <p className={styles.emptyText}>No comments yet.</p>
      ) : (
        <div className={styles.list}>
          {comments?.map(comment => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.header}>
                <div className={styles.avatar}>
                  {comment.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className={styles.name}>{comment.name}</h4>
                  <span className={styles.email}>{comment.email}</span>
                </div>
              </div>
              <p className={styles.body}>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
