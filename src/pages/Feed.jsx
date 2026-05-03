import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/domain/PostCard';
import CreatePostForm from '../components/domain/CreatePostForm';
import Loader from '../components/ui/Loader';
import styles from './Feed.module.css';

export default function Feed() {
  const { data: posts, isLoading, isError } = usePosts();

  if (isLoading) return <Loader fullPage />;
  if (isError) return <div className={styles.error}>Failed to load feed. Please try again.</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Global Feed</h1>
        <p className={styles.subtitle}>See what the network is talking about</p>
      </header>

      <CreatePostForm />

      <div className={styles.postList}>
        {posts?.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
