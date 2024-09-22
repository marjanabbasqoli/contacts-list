// import SureBox from "../SureBox/SureBox";

import { useContext } from "react";
import { ContactsContext } from "../../contexts/ContactsContext";
import Confirm from "../Confirm/Confirm";

function DeleteMultiContact({
	confirm,
	setConfirm,
	setIsDeleteAll,
	setCheckedCount,
}) {
	const { dispatch } = useContext(ContactsContext);

	const deleteItems = (confirm) => {
		dispatch({ type: "DELETE_CHECKED_ITEM", payload: confirm });
		setCheckedCount(0);
	};

	const confirmHandler = () => {
		deleteItems(confirm);
		setConfirm(false);
		setIsDeleteAll(false);
	};

	return (
		// <SureBox
		// 	showModal={showModal}
		// 	sureHandler={sureHandler}
		// 	isModal={true}
		// 	boxTitle={`آیا اطلاعات ${checkedCount} مخاطب حذف شود؟`}
		// />
		<Confirm
			confirm={confirm}
			confirmHandler={confirmHandler}
			boxTitle={"مخاطب از لیست حذف شود؟"}
		/>
	);
}

export default DeleteMultiContact;
