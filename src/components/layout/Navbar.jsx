import { Link, NavLink } from 'react-router-dom';
import { Home, Users, User } from 'lucide-react';
import { useUser } from '../../hooks/useUsers';
import { CURRENT_USER_ID } from '../../api/client';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { data: currentUser } = useUser(CURRENT_USER_ID);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>JSONConnect</span>
        </Link>
        
        <div className={styles.navLinks}>
          <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
            <Home size={20} />
            <span className={styles.navText}>Feed</span>
          </NavLink>
          <NavLink to="/users" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
            <Users size={20} />
            <span className={styles.navText}>Network</span>
          </NavLink>
          <NavLink to={`/users/${CURRENT_USER_ID}`} className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
            <User size={20} />
            <span className={styles.navText}>Profile</span>
          </NavLink>
        </div>

        <div className={styles.userMenu}>
          {currentUser ? (
            <Link to={`/users/${CURRENT_USER_ID}`} className={styles.userProfile}>
              <span className={styles.userName}>{currentUser.name}</span>
              <div className={styles.userAvatar}>
                {currentUser.name.charAt(0)}
              </div>
            </Link>
          ) : (
            <div className={styles.userAvatarSkeleton}></div>
          )}
        </div>
      </div>
    </nav>
  );
}
