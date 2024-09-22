import { useContext, useState } from "react";
import { toast } from "react-toastify";

import { ContactsContext } from "../../contexts/ContactsContext";
import Confirm from "../Confirm/Confirm";

function DeleteContact({ id }) {
	const [confirm, setConfirm] = useState(true);
	const { dispatch } = useContext(ContactsContext);

	const confirmHandler = (confirm) => {
		confirm && deleteHandler();
		setConfirm(false);
	};

	const deleteHandler = () => {
		dispatch({
			type: "DELETE",
			payload: id,
		});
		toast.success("مخاطب از لیست حذف شد");
	};

	return (
		<Confirm
			confirm={confirm}
			confirmHandler={confirmHandler}
			boxTitle={"مخاطب از لیست حذف شود؟"}
		/>
	);
}

export default DeleteContact;
