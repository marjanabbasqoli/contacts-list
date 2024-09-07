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
    <>
    {showBox && <div className="sure-box">
      <p>آیا مایل به حذف این آیتم هستید؟</p>
      <button onClick={() => sureHandler(true)}>بله</button>
      <button onClick={() => sureHandler(false)}>خیر</button>
    </div>}
    </>
  )
}

export default DeleteContact