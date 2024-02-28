import styles from './ui.module.scss';

/* eslint-disable-next-line */
export interface UiProps {}

export function Ui(props: UiProps) {
  return (
    <div className={styles['container']}>
      <h1 className="text-orange-500">Welcome to Ui!</h1>
      <p className="h3 text-orange-200">Smaller text! (how exciting)</p>
    </div>
  );
}

export default Ui;
