import { useContext, useEffect, useState } from "react";

import { ContactsContext } from "../../contexts/ContactsContext.jsx";

import ContactItem from "../ContactItem/ContactItem.jsx";

import styles from "./ContactsList.module.scss";
import Header from "../Header/Header.jsx";

function ContactsList() {
	const {
		state: { isLoading, contacts, error },
		checkedCount,
		setSelectedItem,
	} = useContext(ContactsContext);

	return (
		<>
			<Header />
			<div className="container">
				<div className={styles.contactsList}>
					{isLoading ? (
						<div>Loading...</div>
					) : !error ? (
						!!contacts.length ? (
							contacts.map((contact) => (
								<ContactItem key={contact.id} data={contact} />
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
						<button
							onClick={() => setSelectedItem((prev) => ({ ...prev, isConfirm: true }))}
							className={styles.deleteAll}
						>
							حذف همه
						</button>
					</div>
				)}
			</div>
		</>
	);
}

export default ContactsList;
