import { Link } from 'react-router-dom';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import styles from './UserCard.module.css';

export default function UserCard({ user }) {
  return (
    <div className={`glass-panel ${styles.card}`}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          {user.name.charAt(0)}
        </div>
        <div>
          <h3 className={styles.name}>{user.name}</h3>
          <p className={styles.username}>@{user.username}</p>
        </div>
      </div>
      
      <div className={styles.details}>
        <div className={styles.detailRow}>
          <Mail size={16} />
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </div>
        <div className={styles.detailRow}>
          <Phone size={16} />
          <span>{user.phone}</span>
        </div>
        <div className={styles.detailRow}>
          <Globe size={16} />
          <a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a>
        </div>
        <div className={styles.detailRow}>
          <MapPin size={16} />
          <span>{user.address.city}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <Link to={`/users/${user.id}`} className={styles.viewProfileBtn}>
          View Profile
        </Link>
      </div>
    </div>
  );
}
