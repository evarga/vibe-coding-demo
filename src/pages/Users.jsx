import { useUsers } from '../hooks/useUsers';
import UserCard from '../components/domain/UserCard';
import Loader from '../components/ui/Loader';
import styles from './Users.module.css';

export default function Users() {
  const { data: users, isLoading, isError } = useUsers();

  if (isLoading) return <Loader fullPage />;
  if (isError) return <div className={styles.error}>Failed to load users.</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Network Directory</h1>
        <p className={styles.subtitle}>Discover and connect with other members</p>
      </header>

      <div className={styles.grid}>
        {users?.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
