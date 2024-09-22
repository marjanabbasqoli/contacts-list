import { useState, useEffect, useContext } from "react";

import { toast } from "react-toastify";
import { FaCircleXmark } from "react-icons/fa6";

import { Inputs } from "../../constansts/Inputs";
import { ContactsContext } from "../../contexts/ContactsContext";
import styles from "./ContactForm.module.scss";
import Confirm from "../Confirm/Confirm";

const validEmailRegex = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;
const validPhoneRegex = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;

function ContactForm({ showModal, setShowModal, type, id }) {
	const {
		state: { contacts },
		dispatch,
	} = useContext(ContactsContext);

	const formField = {
		name: "",
		email: "",
		phone: "",
		job: "",
	};

	const [form, setForm] = useState(
		type === "add"
			? { ...formField, isChecked: false }
			: contacts.find((contact) => contact.id === id)
	);

	const [message, setMessage] = useState({ ...formField });
	const [isValidate, setIsValidate] = useState(false);
	const [confirm, setConfirm] = useState(false);

	useEffect(() => {
		const isEmpty = Object.values(form).splice(0, 3).includes("");
		const isExist = contacts.find((c) => c.name === form.name);

		setIsValidate(
			!(
				isExist ||
				isEmpty ||
				!form.email.match(validEmailRegex) ||
				!form.phone.match(validPhoneRegex)
			)
				? true
				: false
		);
	}, [form]);

	const changeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value.trim();
		setForm((form) => ({ ...form, [name]: value }));
		validation(name, value, message, setMessage);
	};

	const validation = (name, value, message, setMessage) => {
		name !== "job" &&
			setMessage({
				...message,
				[name]: !value ? "لطفا اطلاعات خو را وارد نمایید" : "",
			});

		const isExist =
			name === "name" && value && contacts.find((c) => c.name === value);
		isExist && setMessage({ ...message, name: "این نام قبلا اضافه شده است" });

		const validEmail = name === "email" && value && !value.match(validEmailRegex);
		validEmail &&
			setMessage({ ...message, email: "لطفا یک ایمیل معتبر وارد کنید" });

		const validPhone = name === "phone" && value && !value.match(validPhoneRegex);
		validPhone &&
			setMessage({ ...message, phone: "لطفا یک شماره تلفن معتبر وارد نمایید" });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		setConfirm(true);
	};

	const confirmHandler = (confirm) => {
		confirm && changeList(type);
		setConfirm(false);
		setShowModal(false);
	};

	const changeList = (type) => {
		if (isValidate) {
			if (type === "add") {
				dispatch({
					type: "ADD",
					payload: {
						id: Math.ceil(Math.random() * 10000 * (Math.random() * 24)).toFixed(),
						...form,
					},
				});
				toast.success("مخاطب با موفقیت افزوده شد");
			} else {
				dispatch({
					type: "EDIT",
					payload: form,
				});
				toast.success("مخاطب با موفقیت ویرایش شد");
			}
		}
	};

	const closeModal = (e) => {
		!e.target.closest(".container") && setShowModal(false);
	};

	return (
		<>
			<div
				className={`modal ${showModal ? "show-modal" : null}`}
				onClick={(e) => closeModal(e)}
			>
				<div className="container">
					<button onClick={() => setShowModal(false)} className="close">
						<FaCircleXmark />
					</button>

					<form onSubmit={submitHandler}>
						{Inputs.map((input, index) => (
							<div className="input-wrap" key={index}>
								<input
									type={input.type}
									name={input.name}
									placeholder={input.placeholder}
									value={form[input.name]}
									onChange={changeHandler}
									className={styles.input}
								/>
								<div className="message">{message[input.name]}</div>
							</div>
						))}

						<button
							type="submit"
							className={`submit ${!isValidate ? "disabled" : null}`}
						>
							افزودن
						</button>
					</form>
				</div>

				<Confirm
					confirm={confirm}
					confirmHandler={confirmHandler}
					boxTitle={
						type === "add"
							? "مخاطب به لیست اضافه شود؟"
							: "آیا اطلاعات مخاطب ویرایش شود؟"
					}
				/>
			</div>
		</>
	);
}

export default ContactForm;
