import styles from "./SureBox.module.scss"

function SureBox({sureHandler , showBox , isModal, boxTitle}) {
  return (
    showBox &&
      <div className={isModal ? styles.modalSureBox : styles.simple}>
        <div className={`${styles.container} ${styles.sureBox}`}>
           <div>
                <div>{boxTitle}</div>
                <div className={styles.buttonsWrap}>
                    <button onClick={() => sureHandler(true)}>بله</button>
                    <button onClick={() => sureHandler(false)}>خیر</button>
                </div>
           </div>
        </div>
      </div>
        
  )
}

export default SureBox