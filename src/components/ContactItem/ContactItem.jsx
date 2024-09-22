import { useContext, useEffect, useState } from "react";

import { FaRegPenToSquare, FaRegTrashCan, FaCheck } from "react-icons/fa6";

import styles from "./ContactItem.module.scss";

import ContactForm from "../ContactForm/ContactForm";
import DeleteContact from "../DeleteContact/DeleteContact";
import { ContactsContext } from "../../contexts/ContactsContext";
import DeleteMultiContact from "../DeleteMultiContact/DeleteMultiContact";

function ContactItem({
	data: { id, name, email },
	isDeleteAll,
	setIsDeleteAll,
	checkedCount,
	setCheckedCount,
}) {
	const [showModal, setShowModal] = useState(false);
	const [deleteItem, setDeleteItem] = useState(false);
	// const [confirm, setConfirm] = useState(false);
	const {
		state: { contacts },
		dispatch,
	} = useContext(ContactsContext);

	// const [checked, setChecked] = useState(false);
	// let checked = false;

	// useEffect(() => {
	// 	setChecked(!checkedCount ? false : checked);
	// }, [checkedCount]);

	const checkboxHandler = (id, e) => {
		// const indexItem = contacts.findIndex((c) => c.id === id);
		// contacts[indexItem].isChecked = e.target.checked;
		// const newContacts = contacts.map((contact) =>
		// 	contact.id === id ? { ...contact, isChecked: e.target.checked } : contact
		// );
		// contacts = [...newContacts];
		// console.log(contacts);
		// console.log(e.target.checked ? checkedCount + 1 : checkedCount - 1);
		// console.log(checkedCount);
	};

	console.log({ checkedCount });

	return (
		<>
			<div className={styles.checkboxWrapper}>
				<div className={`${styles.checkbox} ${isDeleteAll && styles.show} `}>
					<input
						type="checkbox"
						onChange={(e) => {
							dispatch({ type: "CHECKED", payload: { id, e } });
							// setChecked((checked) => !checked);
							// checked = e.target.checked;
							setCheckedCount((checkedCount) =>
								e.target.checked ? checkedCount + 1 : checkedCount - 1
							);
						}}
					/>

					<div>
						<FaCheck />
					</div>
				</div>
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
