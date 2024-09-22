// import SureBox from "../SureBox/SureBox";

import { useContext } from "react";
import { ContactsContext } from "../../contexts/ContactsContext";
import Confirm from "../Confirm/Confirm";

function DeleteMultiContact() {
	const {
		dispatch,
		setCheckedCount,
		selectedItem: { isConfirm },
		setSelectedItem,
	} = useContext(ContactsContext);

	const deleteItems = (confirm) => {
		dispatch({ type: "DELETE_CHECKED_ITEM", payload: confirm });
		setCheckedCount(0);
	};

	const confirmHandler = (confirm) => {
		deleteItems(confirm);
		setSelectedItem({
			isSelected: false,
			isConfirm: false,
		});
		// setShowModal(false);
		// setIsDeleteAll(false);
	};

	return (
		// <SureBox
		// 	showModal={showModal}
		// 	sureHandler={sureHandler}
		// 	isModal={true}
		// 	boxTitle={`آیا اطلاعات ${checkedCount} مخاطب حذف شود؟`}
		// />
		<Confirm
			confirm={isConfirm}
			confirmHandler={confirmHandler}
			boxTitle={"مخاطب از لیست حذف شود؟"}
		/>
	);
}

export default DeleteMultiContact;
