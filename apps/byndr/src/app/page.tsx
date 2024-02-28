import styles from './page.module.scss';
import { Ui } from '@byndr/ui';

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className={styles.page}>
      <Ui></Ui>
    </div>
  );
}
