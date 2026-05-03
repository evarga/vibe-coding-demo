import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Feed from './pages/Feed';
import Users from './pages/Users';
import Profile from './pages/Profile';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appContainer}>
      <Navbar />
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
