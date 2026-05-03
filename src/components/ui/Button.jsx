import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', size = 'md', className = '', isLoading, ...props }) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classNames} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? <span className={styles.loader}></span> : children}
    </button>
  );
}
