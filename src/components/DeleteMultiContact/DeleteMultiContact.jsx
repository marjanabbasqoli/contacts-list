function DeleteMultiContact({contacts , setSearchedContact , showBox , setShowBox , checkedCount , setCheckedCount}) { 

  const deleteItems = () => {
    const newContacts = contacts.filter(contacts => contacts.isChecked !== true);
    contacts = [...newContacts];
    setSearchedContact(contacts);
    localStorage.setItem('contacts' , JSON.stringify(contacts));
    setCheckedCount(0);
  }

  const sureHandler = (sure) => {
    sure && deleteItems(); 
    setShowBox(false);
  }

  return (
    <>
    {showBox && !!checkedCount && <div className="sure-box">
      <p>آیا مایل به حذف {checkedCount} آیتم هستید؟</p>
      <button onClick={() => sureHandler(true)}>بله</button>
      <button onClick={() => sureHandler(false)}>خیر</button>
    </div>}
    </>
  )
}

export default DeleteMultiContact