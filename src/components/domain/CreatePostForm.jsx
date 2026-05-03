import { useState } from 'react';
import { Send } from 'lucide-react';
import Button from '../ui/Button';
import { useCreatePost } from '../../hooks/usePosts';
import { CURRENT_USER_ID } from '../../api/client';
import styles from './CreatePostForm.module.css';

export default function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { mutate: createPost, isPending } = useCreatePost();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    createPost({
      title,
      body,
      userId: CURRENT_USER_ID,
    }, {
      onSuccess: () => {
        setTitle('');
        setBody('');
      }
    });
  };

  return (
    <form className={`glass-panel ${styles.form}`} onSubmit={handleSubmit}>
      <h3 className={styles.heading}>Create a Post</h3>
      <input
        type="text"
        placeholder="Post title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
        disabled={isPending}
      />
      <textarea
        placeholder="What's on your mind?"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className={styles.textarea}
        rows={3}
        disabled={isPending}
      />
      <div className={styles.actions}>
        <Button type="submit" isLoading={isPending}>
          <Send size={16} />
          <span>Post</span>
        </Button>
      </div>
    </form>
  );
}
