import SureBox from "../SureBox/SureBox";

function DeleteContact(props) { 
  const {deleteItemId , contacts , setSearchedContact , showBox , setShowBox , setIsDelete} = props;

  const deleteItem = (id) => {
    const newContacts = contacts.filter(c => c.id !== id);
    // contacts = [...newContacts];
    setSearchedContact([...newContacts]);
    localStorage.setItem('contacts' , JSON.stringify([...newContacts]));
  }

  const sureHandler = (sure) => {
    sure && deleteItem(deleteItemId);
    setShowBox(false);
    setIsDelete(false);
  }

  return (
    <SureBox showBox={showBox} sureHandler={sureHandler} isModal={true} boxTitle={"آیا از حذف مخاطب مطمئن هستید؟"}/>
  )
}

export default DeleteContact