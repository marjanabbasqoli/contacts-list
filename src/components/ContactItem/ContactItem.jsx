import { FaRegPenToSquare , FaRegTrashCan , FaCheck } from "react-icons/fa6";

import styles from "./ContactItem.module.scss";

function ContactItem({data : {id, name , email} , deleteHandler , editHandler , checkboxHandler , isDeleteAll}) {
  return (
    <>
      <div className={styles.checkboxWrapper}>
        <div className={`${styles.checkbox} ${isDeleteAll && styles.show}` }>
            <input type="checkbox" onChange={(e) => checkboxHandler(id , e)} />
            <FaCheck />
        </div>
        <div className={styles.oneItem}>
          <div className={styles.rightBox}>
            
            <div className={styles.userInfo}>
              <figure>{name.split('')[0]}</figure>
              <div>
                <h3>{name}</h3>
                <div className={`ubuntu ${styles.email}`}>{email}</div>
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
              <button onClick={() => editHandler(id)}><FaRegPenToSquare /></button>
              <button style={{color: '#e40012'}} onClick={() => deleteHandler(id)}><FaRegTrashCan /></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactItem