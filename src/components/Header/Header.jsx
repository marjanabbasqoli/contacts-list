import { FaUserPlus , FaUserMinus } from "react-icons/fa6";

import styles from "./Header.module.scss";
import Search from "../Search/Search";

function Header({search , setSearch , searchHandler , setIsAddContact , deleteMultiHandler}) {
  return (
    <div className={styles.bg}>
        <div className="container">
          <div className={styles.flexBox}>
            <h1>لیست مخاطبین</h1>

            <div className={styles.leftBox}>
              <Search search={search} setSearch={setSearch} searchHandler={searchHandler} />
              
              <div className={styles.buttonsWrap}>
                <button onClick={() => setIsAddContact(true)}>
                  <FaUserPlus />
                </button>

                <button onClick={deleteMultiHandler}>
                  <FaUserMinus />
                </button>
              </div>
            </div>
          </div>
            
        </div>
        
    </div>
  )
}

export default Header