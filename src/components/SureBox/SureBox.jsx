import styles from "./SureBox.module.scss"

function SureBox({sureHandler , showBox}) {
  return (
    showBox &&
        <div className={`container ${styles.sureBox}`}>
           <div>
                <div>مخاطب ویرایش شود؟</div>
                <div className={styles.buttonsWrap}>
                    <button onClick={() => sureHandler(true)}>بله</button>
                    <button onClick={() => sureHandler(false)}>خیر</button>
                </div>
           </div>
        </div>
  )
}

export default SureBox