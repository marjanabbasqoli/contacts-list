import { useContext, useEffect, useState } from "react";

import { ContactsContext } from "../../contexts/ContactsContext.jsx";

import ContactItem from "../ContactItem/ContactItem.jsx";

import styles from "./ContactsList.module.scss";
import Header from "../Header/Header.jsx";
import DeleteMultiContact from "../DeleteMultiContact/DeleteMultiContact.jsx";

function ContactsList() {
	const {
		state: { isLoading, contacts, error },
		setSelectedItem,
	} = useContext(ContactsContext);

	const [isDeleteAll, setIsDeleteAll] = useState(false);
	const [checkedCount, setCheckedCount] = useState(0);
	const [confirm, setConfirm] = useState(false);

	return (
		<>
			<Header isDeleteAll={isDeleteAll} setIsDeleteAll={setIsDeleteAll} />
			<div className="container">
				<div className={styles.contactsList}>
					{isLoading ? (
						<div>Loading...</div>
					) : !error ? (
						!!contacts.length ? (
							contacts.map((contact) => (
								<ContactItem
									key={contact.id}
									data={contact}
									isDeleteAll={isDeleteAll}
									setIsDeleteAll={setIsDeleteAll}
									checkedCount={checkedCount}
									setCheckedCount={setCheckedCount}
								/>
							))
						) : (
							<div className={styles.noItem}>مخاطبی یافت نشد</div>
						)
					) : (
						<div>{error}</div>
					)}
				</div>

				{!!checkedCount && (
					<div className="container">
						<button onClick={() => setConfirm(true)} className={styles.deleteAll}>
							حذف همه
						</button>
					</div>
				)}

				{isDeleteAll && (
					<DeleteMultiContact
						checkedCount={checkedCount}
						setCheckedCount={setCheckedCount}
						setIsDeleteAll={setIsDeleteAll}
						confirm={confirm}
						setConfirm={setConfirm}
					/>
				)}
			</div>
		</>
	);
}

export default ContactsList;
