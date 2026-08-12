import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.frame}>
      <div className={styles.frame1410097646}>
        <p className={styles.text}>首页</p>
        <p className={styles.text}>集群列表</p>
        <div className={styles.frame1000003746}>
          <p className={styles.topic}>Topic</p>
        </div>
        <p className={styles.text}>Consumer group</p>
        <p className={styles.text}>Mirror</p>
        <p className={styles.text}>Databus</p>
        <p className={styles.text}>GlobalBMQ</p>
        <p className={styles.text}>个人工单</p>
      </div>
      <div className={styles.frame14100976462}>
        <img src="../image/msn809g5-1f8iip1.svg" className={styles.divider} />
        <div className={styles.menuItem}>
          <img src="../image/msn809g5-edg0sv1.svg" className={styles.drawerFold} />
        </div>
      </div>
    </div>
  );
}

export default Component;
