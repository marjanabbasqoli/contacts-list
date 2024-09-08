import SureBox from "../SureBox/SureBox";

function DeleteMultiContact({contacts , setSearchedContact , showBox , setShowBox , checkedCount , setCheckedCount , setIsDeleteAll}) { 
  const deleteItems = (sure) => {
    if(sure) {
      const newContacts = contacts.filter(contacts => contacts.isChecked !== true);
      contacts = [...newContacts];
      setSearchedContact(contacts);
      localStorage.setItem('contacts' , JSON.stringify(contacts));
    }
    else {
      setIsDeleteAll(false);
      const newContacts = contacts.map(contact =>({...contact , isChecked: false}));
      contacts = [...newContacts];
      setSearchedContact(contacts);
      localStorage.setItem('contacts' , JSON.stringify(contacts));
    }
    setCheckedCount(0);
  }

  const sureHandler = (sure) => {
    deleteItems(sure); 
    setShowBox(false);
    setIsDeleteAll(false);
  }

  return (
    <SureBox showBox={showBox} sureHandler={sureHandler} isModal={true} boxTitle={`آیا اطلاعات ${checkedCount} مخاطب حذف شود؟`} />
  )
}

export default DeleteMultiContact