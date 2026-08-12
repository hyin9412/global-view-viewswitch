import React from 'react';
import { Tabs } from 'xxxx';
import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.frame21199045342}>
      <div className={styles.frame2119904527}>
        <div className={styles.frame1410097636}>
          <div className={styles.instance}>
            <p className={styles.text}>关系型数据库RDS列表</p>
            <div className={styles.line}>
              <div className={styles.frame} />
            </div>
            <p className={styles.text2}>cp_govern 全球视图</p>
          </div>
          <div className={styles.frame2119904534}>
            <p className={styles.text2}>视图详情：</p>
            <div className={styles.frame4}>
              <div className={styles.frame2}>
                <p className={styles.text3}>toutiao.mysql.cp_govern_write</p>
              </div>
              <div className={styles.frame3}>
                <p className={styles.text4}>
                  China-East | China-Enterprise | China-HKPay | China-North |
                  China-North6 | China-Pay | US-TTP3 | US-TTP4
                </p>
              </div>
            </div>
          </div>
          <div className={styles.frame2147239841}>
            <div className={styles.iconWrapper}>
              <img src="../image/msmz8zhy-wpdv6pf.svg" className={styles.icons} />
            </div>
            <div className={styles.instance2}>
              <p className={styles.buttonTitle}>一致性治理</p>
            </div>
            <div className={styles.instance3}>
              <p className={styles.buttonTitle2}>多区域变更</p>
              <img src="../image/msmz8zhy-0r7781g.svg" className={styles.icons} />
            </div>
            <div className={styles.iconWrapper}>
              <img src="../image/msmz8zhy-i2fnupy.svg" className={styles.icons} />
            </div>
          </div>
        </div>
        <div className={styles.frame2036084033}>
          <div className={styles.tabs}>
            <div className={styles.frame2147239871}>
              <div className={styles.frame2119904466}>
                <img
                  src="../image/msmz8zi2-q6rbk5z.png"
                  className={styles.image6}
                />
              </div>
              <p className={styles.text5}>全球视图</p>
            </div>
            <div className={styles.frame2147239870}>
              <img src="../image/msmz8zhy-42eo4mw.svg" className={styles.frame5} />
              <div className={styles.frame1410098062}>
                <p className={styles.cN}>CN</p>
                <p className={styles.a7}>(7)</p>
              </div>
            </div>
            <div className={styles.frame14100980623}>
              <img src="../image/msmz8zhy-v8kna4d.svg" className={styles.icons} />
              <div className={styles.frame14100980622}>
                <p className={styles.text5}>BOE</p>
                <p className={styles.a7}>(2)</p>
              </div>
            </div>
            <div className={styles.frame14100980623}>
              <img src="../image/msmz8zhy-49qc6o9.svg" className={styles.icons} />
              <div className={styles.frame14100980622}>
                <p className={styles.text5}>I18N-BD</p>
                <p className={styles.a7}>(2)</p>
              </div>
            </div>
            <div className={styles.frame14100980623}>
              <img src="../image/msmz8zhy-4n9ebzi.svg" className={styles.icons} />
              <div className={styles.frame14100980622}>
                <p className={styles.text5}>I18N-TT</p>
                <p className={styles.a7}>(2)</p>
              </div>
            </div>
            <div className={styles.frame14100980623}>
              <img src="../image/msmz8zhy-1ivzxqp.svg" className={styles.icons} />
              <div className={styles.frame14100980622}>
                <p className={styles.text5}>US-TTP</p>
                <p className={styles.a7}>(2)</p>
              </div>
            </div>
            <div className={styles.frame14100980623}>
              <img src="../image/msmz8zhy-a6w55mo.svg" className={styles.icons} />
              <div className={styles.frame14100980622}>
                <p className={styles.text5}>US-TTPBD</p>
                <p className={styles.a7}>(2)</p>
              </div>
            </div>
            <div className={styles.frame14100980623}>
              <img src="../image/msmz8zhy-v266vvy.svg" className={styles.icons} />
              <div className={styles.frame14100980622}>
                <p className={styles.text5}>EU-TTP</p>
                <p className={styles.a7}>(1)</p>
              </div>
            </div>
          </div>
          <Tabs className={styles.frame6} />
        </div>
      </div>
    </div>
  );
}

export default Component;
