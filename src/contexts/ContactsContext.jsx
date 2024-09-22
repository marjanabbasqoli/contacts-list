const BASE_URL = "http://localhost:3000/contacts";

import { createContext, useEffect, useReducer, useState } from "react";

// const initialState = JSON.parse(localStorage.getItem("contacts")) || [];
const initialState = {
	isLoading: true,
	contacts: [],
	error: "",
};

let contactsData = null;

const reducer = (state, action) => {
	switch (action.type) {
		case "SUCCESS": {
			contactsData = [...action.payload];
			return { isLoading: false, contacts: action.payload, error: "" };
		}

		case "FAILED":
			return { isLoading: false, contacts: [], error: action.payload };

		case "SEARCH":
			const searchedContacts = contactsData.filter(
				(contact) =>
					contact.name.toLowerCase().includes(action.payload) ||
					contact.email.toLowerCase().includes(action.payload)
			);
			return {
				...state,
				contacts: [...searchedContacts],
			};

		case "ADD":
			addDataToDb(action.payload);
			return { ...state, contacts: [...state.contacts, action.payload] };

		case "EDIT":
			fetch(`${BASE_URL}/${action.payload.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/sandip",
				},
				body: JSON.stringify(action.payload),
			});

			const newContacts = contactsData.map((contact) =>
				contact.id === action.payload.id ? action.payload : contact
			);

			return { ...state, contacts: [...newContacts] };

		case "DELETE":
			deleteFromDb(action.payload);
			const deletedContacts = contactsData.filter(
				(contact) => contact.id !== action.payload
			);
			return {
				...state,
				contacts: [...deletedContacts],
			};

		case "DELETE_CHECKED_ITEM":
			const selectedContacts = action.payload
				? contactsData.filter((contacts) => contacts.isChecked !== true)
				: contactsData.map((contact) => ({
						...contact,
						isChecked: false,
				  }));

			!action.payload && setIsDeleteAll(false);
			return { ...state, contacts: [...selectedContacts] };

		case "CHECKED":
			// const changeContacts = contactsData.filter((c) => {
			// 	c.id === action.payload.id
			// 		? { ...c, isChecked: action.payload.isChecked }
			// 		: c;
			// });

			return { ...state };

		default:
			throw new Error("invalid action");
	}
};

const addDataToDb = (data) => {
	fetch(BASE_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/sandip",
		},
		body: JSON.stringify(data),
	});
};

const deleteFromDb = (id) => {
	fetch(`${BASE_URL}/${id}`, {
		method: "DELETE",
	});
};

export const ContactsContext = createContext();

function ContactsProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [checkedCount, setCheckedCount] = useState(0);
	const [selectedItem, setSelectedItem] = useState({
		isSelected: false,
		isConfirm: false,
	});

	const checkboxHandler = (id, e) => {};

	// const [search, setSearch] = useState({
	// 	value: "",
	// 	result: [],
	// });

	useEffect(() => {
		fetch(BASE_URL)
			.then((res) => res.json())
			.then((contacts) => dispatch({ type: "SUCCESS", payload: contacts }))
			.catch((error) => dispatch({ type: "FAILED", payload: error.message }));
	}, [state.contacts]);

	return (
		<ContactsContext.Provider
			value={{
				state,
				dispatch,
				checkedCount,
				setCheckedCount,
				selectedItem,
				setSelectedItem,
				checkboxHandler,
			}}
		>
			{children}
		</ContactsContext.Provider>
	);
}

export default ContactsProvider;
