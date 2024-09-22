import { useContext, useEffect, useState } from "react";

import { FaRegPenToSquare, FaRegTrashCan, FaCheck } from "react-icons/fa6";

import styles from "./ContactItem.module.scss";

import ContactForm from "../ContactForm/ContactForm";
import DeleteContact from "../DeleteContact/DeleteContact";

function ContactItem({ data: { id, name, email } }) {
	const [showModal, setShowModal] = useState(false);
	const [deleteItem, setDeleteItem] = useState(false);
	// const [confirm, setConfirm] = useState(false);

	const [checked, setChecked] = useState(false);

	// useEffect(() => {
	// 	setChecked(!checkedCount ? false : checked);
	// }, [checkedCount]);

	return (
		<>
			<div className={styles.checkboxWrapper}>
				{/* <div className={`${styles.checkbox} ${isDeleteAll && styles.show} ${checked ? styles.checked : ''}`}>
            <input 
              type="checkbox" 
              onChange={(e) => {
                checkboxHandler(id , e);
                setChecked(checked => !checked);
              }}
              checked={checked}
            />
            <FaCheck style={!checked && {opacity: 0}}/>
        </div> */}
				<div className={styles.oneItem}>
					<div className={styles.rightBox}>
						<div className={styles.userInfo}>
							<figure>{name.split("")[0]}</figure>
							<div>
								<h3>{name}</h3>
								<div className={`ubuntu ${styles.email}`}>{email}</div>
							</div>
						</div>
					</div>
					{
						<div className={styles.buttons}>
							<button onClick={() => setShowModal(true)}>
								<FaRegPenToSquare />
							</button>
							<button style={{ color: "#e40012" }} onClick={() => setDeleteItem(true)}>
								<FaRegTrashCan />
							</button>
						</div>
					}
				</div>
			</div>

			{showModal && (
				<ContactForm
					showModal={showModal}
					setShowModal={setShowModal}
					type="edit"
					id={id}
				/>
			)}

			{deleteItem && <DeleteContact id={id} />}
		</>
	);
}

export default ContactItem;
