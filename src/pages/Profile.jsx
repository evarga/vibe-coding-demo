import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser, useUserTodos } from '../hooks/useUsers';
import { useUserPosts } from '../hooks/usePosts';
import { useUserAlbums } from '../hooks/useAlbums';
import PostCard from '../components/domain/PostCard';
import TodoItem from '../components/domain/TodoItem';
import AlbumCard from '../components/domain/AlbumCard';
import Loader from '../components/ui/Loader';
import { Mail, Phone, Globe, MapPin, Briefcase, FileText, CheckSquare, Image as ImageIcon } from 'lucide-react';
import styles from './Profile.module.css';

export default function Profile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('posts');
  
  const { data: user, isLoading: isUserLoading } = useUser(id);
  const { data: posts, isLoading: isPostsLoading } = useUserPosts(id);
  const { data: todos, isLoading: isTodosLoading } = useUserTodos(id);
  const { data: albums, isLoading: isAlbumsLoading } = useUserAlbums(id);

  if (isUserLoading) return <Loader fullPage />;
  if (!user) return <div className={styles.error}>User not found.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarLarge}>
          {user.name.charAt(0)}
        </div>
        <div className={styles.headerInfo}>
          <h1 className={styles.name}>{user.name}</h1>
          <p className={styles.username}>@{user.username}</p>
        </div>
      </div>

      <div className={styles.grid}>
        <aside className={styles.sidebar}>
          <div className={`glass-panel ${styles.infoCard}`}>
            <h3 className={styles.cardTitle}>About</h3>
            <div className={styles.detailList}>
              <div className={styles.detailRow}>
                <Mail size={18} /> <a href={`mailto:${user.email}`}>{user.email}</a>
              </div>
              <div className={styles.detailRow}>
                <Phone size={18} /> <span>{user.phone}</span>
              </div>
              <div className={styles.detailRow}>
                <Globe size={18} /> <a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a>
              </div>
              <div className={styles.detailRow}>
                <MapPin size={18} /> <span>{user.address.street}, {user.address.city}</span>
              </div>
              <div className={styles.detailRow}>
                <Briefcase size={18} /> <span>{user.company.name}</span>
              </div>
            </div>
          </div>
        </aside>

        <main className={styles.mainContent}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'posts' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              <FileText size={18} />
              <span>Posts</span>
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'todos' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('todos')}
            >
              <CheckSquare size={18} />
              <span>Todos</span>
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'albums' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('albums')}
            >
              <ImageIcon size={18} />
              <span>Albums</span>
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === 'posts' && (
              <div className={styles.fadeContent}>
                {isPostsLoading ? <Loader /> : (
                  <div className={styles.postList}>
                    {posts?.length === 0 ? (
                      <p className={styles.emptyState}>No posts yet.</p>
                    ) : (
                      posts?.map(post => (
                        <PostCard key={post.id} post={{...post, user}} />
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'todos' && (
              <div className={styles.fadeContent}>
                <div className={styles.todosContainer}>
                  <div className={styles.todosHeader}>
                    <h3 className={styles.todosTitle}>Task List</h3>
                    <span className={styles.todosStats}>
                      {todos?.filter(t => t.completed).length || 0} / {todos?.length || 0} completed
                    </span>
                  </div>
                  {isTodosLoading ? <Loader /> : (
                    <div className={styles.scrollableTodos}>
                      {todos?.map(todo => (
                        <TodoItem key={todo.id} todo={todo} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'albums' && (
              <div className={styles.fadeContent}>
                {isAlbumsLoading ? <Loader /> : (
                  <div className={styles.albumGrid}>
                    {albums?.map(album => (
                      <AlbumCard key={album.id} album={album} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
