import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { useToggleTodo } from '../../hooks/useUsers';
import styles from './TodoItem.module.css';

export default function TodoItem({ todo }) {
  const { mutate: toggleTodo, isPending } = useToggleTodo();

  const handleToggle = () => {
    if (isPending) return;
    toggleTodo(todo);
  };

  return (
    <div 
      className={`${styles.item} ${todo.completed ? styles.completed : ''} ${isPending ? styles.pending : ''}`}
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      <div className={styles.icon}>
        {isPending ? (
          <Loader2 size={20} className={styles.spinner} />
        ) : todo.completed ? (
          <CheckCircle2 size={20} className={styles.checked} />
        ) : (
          <Circle size={20} className={styles.unchecked} />
        )}
      </div>
      <span className={styles.title}>{todo.title}</span>
    </div>
  );
}
