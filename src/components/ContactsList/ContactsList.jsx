import {useState } from 'react';
import ContactItem from '../ContactItem/ContactItem';
import Header from "../Header/Header.jsx";

import styles from './ContactsList.module.scss';
import AddContact from '../AddContact/AddContact.jsx';
import EditContact from '../EditContact/EditContact.jsx';
import DeleteMultiContact from '../DeleteMultiContact/DeleteMultiContact.jsx';
import DeleteContact from '../DeleteContact/DeleteContact.jsx';

function ContactsList() {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const [search, setSearch] = useState('');
    const [searchedContact, setSearchedContact] = useState(contacts);

    const [isAddContact , setIsAddContact] = useState(false);
    const [isEditContact , setIsEditContact] = useState(false);
    const [editItemId , setEditItemId] = useState(0);
    const [isDeleteAll , setIsDeleteAll] = useState(false);

    const [deleteItemId , setDeleteItemId] = useState(0);
    const [isDelete , setIsDelete] = useState(false);
    const [checkedCount , setCheckedCount] = useState(0);
    const [showBox, setShowBox] = useState(false);

    const saveToLocalstorage = () => {
        localStorage.setItem('contacts' , JSON.stringify(contacts));
    }

    saveToLocalstorage();

    const checkboxHandler = (id , e) => {
        const indexItem = contacts.findIndex(c => c.id === id);
        contacts[indexItem].isChecked = e.target.checked;
        setCheckedCount(checkedCount => e.target.checked ? checkedCount + 1 : checkedCount - 1);
        saveToLocalstorage();
    }

    const deleteHandler = (id) => {
        setIsDelete(true);
        setShowBox(true);
        setDeleteItemId(id);
    }

    const editHandler = (id) => {
        setIsEditContact(true);
        setEditItemId(id);
    }

    const searchHandler = () => {
        search ?
        setSearchedContact(contacts.filter(contact => (contact.name.includes(search) || contact.email.includes(search)))) 
        :
        setSearchedContact(contacts);
    }
    
    const deleteMultiHandler = () => {
        setIsDeleteAll(true);
        setShowBox(true);
    }

    return (
        <>
            <Header search={search} setSearch={setSearch} searchHandler={searchHandler} setIsAddContact={setIsAddContact} deleteMultiHandler={deleteMultiHandler} />
            
            <div className="container">
                <div className={styles.contactsList}>
                    {searchedContact.length ? 
                        searchedContact.map(contact => <ContactItem key={contact.id} data={contact} deleteHandler={deleteHandler} editHandler={editHandler} checkboxHandler={checkboxHandler} isDeleteAll={isDeleteAll} />)
                        :
                        <div className={styles.noItem}>مخاطبی یافت نشد</div>
                    }
                </div>
            </div>

                
            {isAddContact && <AddContact isAddContact={isAddContact} setIsAddContact={setIsAddContact} contacts={contacts} setSearchedContact={setSearchedContact} />}
            {isEditContact && <EditContact isEditContact= {isEditContact} setIsEditContact={setIsEditContact} contacts={contacts} setSearchedContact={setSearchedContact} editItemId={editItemId} />}

            {isDeleteAll && !!checkedCount && <DeleteMultiContact contacts={contacts} setSearchedContact={setSearchedContact} showBox={showBox} setShowBox={setShowBox} checkedCount={checkedCount} setCheckedCount={setCheckedCount} />}
            {isDelete && <DeleteContact contacts={contacts} setSearchedContact={setSearchedContact} deleteItemId={deleteItemId} showBox={showBox} setShowBox={setShowBox} setIsDelete={setIsDelete} />} 
          
        </>
    )
}

export default ContactsList