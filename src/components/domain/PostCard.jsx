import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Trash2, User } from 'lucide-react';
import Button from '../ui/Button';
import CommentList from './CommentList';
import { useDeletePost } from '../../hooks/usePosts';
import { CURRENT_USER_ID } from '../../api/client';
import styles from './PostCard.module.css';

export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  const { mutate: deletePost, isPending } = useDeletePost();
  
  const isOwnPost = post.userId === CURRENT_USER_ID;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
    }
  };

  return (
    <article className={`glass-panel ${styles.card}`}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <User size={20} />
          </div>
          <div>
            <Link to={`/users/${post.userId}`} className={styles.userName}>
              {post.user ? post.user.name : `User ${post.userId}`}
            </Link>
            {post.user && <p className={styles.userHandle}>@{post.user.username}</p>}
          </div>
        </div>
        {isOwnPost && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDelete}
            isLoading={isPending}
            className={styles.deleteBtn}
            title="Delete post"
          >
            <Trash2 size={16} />
          </Button>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.body}>{post.body}</p>
      </div>

      <div className={styles.footer}>
        <button 
          className={styles.actionBtn}
          onClick={() => setShowComments(!showComments)}
        >
          <MessageSquare size={18} />
          <span>{showComments ? 'Hide Comments' : 'View Comments'}</span>
        </button>
      </div>
      
      {showComments && <CommentList postId={post.id} />}
    </article>
  );
}
