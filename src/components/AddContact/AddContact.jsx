import { useState , useEffect } from "react";

import { toast } from 'react-toastify';
import { FaCircleXmark } from "react-icons/fa6";

import { Inputs } from "../../constansts/Inputs";

import styles from "./AddContact.module.scss";

const validEmailRegex = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;
const validPhoneRegex = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;

function AddContact({isAddContact , setIsAddContact , contacts , setSearchedContact}) {
    const [form , setForm] = useState({
        name: "",
        email: "",
        phone: "",
        job: "",
        isChecked: false
    });

    const [message , setMessage] = useState({
        name : "",
        email: "",
        phone: "",
        job: ""
    });

    const [isValidate , setIsValidate] = useState(false);

    useEffect(() => {
        const isEmpty = Object.values(form).includes('');
        const isExist = contacts.find(c => c.name.includes(form.name));
        setIsValidate(!(isExist || isEmpty || !form.email.match(validEmailRegex) || !form.phone.match(validPhoneRegex)) ? true : false);
    }, [form]);

    const changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value.trim();
        setForm(form => ({...form , [name]: value}));
        validation(name , value , message , setMessage);
    }

    const validation = (name, value, message, setMessage) => {
        setMessage({ ...message, [name]: !value ? "لطفا اطلاعات خو را وارد نمایید" : "" });

        const isExist = name === "name" && value && contacts.find(c => c.name.includes(value));
        isExist && setMessage({ ...message, name: "این نام قبلا اضافه شده است"});

        const validEmail = name === "email" && value && !value.match(validEmailRegex);
        validEmail && setMessage({ ...message, email: "لطفا یک ایمیل معتبر وارد کنید" });
       
        const validPhone = name === "phone" && value && !value.match(validPhoneRegex);
        validPhone && setMessage({ ...message, phone: "لطفا یک شماره تلفن معتبر وارد نمایید" });
    };

    const submitHandler = (e) => {
        e.preventDefault();
       
        if(isValidate) {
            contacts.push({id: Math.ceil((Math.random()* 10000) * (Math.random() * 24)) , ...form});
            localStorage.setItem('contacts' , JSON.stringify(contacts));
            setSearchedContact(contacts);
            setIsAddContact(false);
            toast.success('مخاطب با موفقیت افزوده شد', {className: "success-toast"});
        } 
    }

    const closeModal = (e) => {
        !e.target.closest('.container') && setIsAddContact(false)
    }

  return (
    <> 
        <div className={`modal ${isAddContact ? 'show-modal' : ''}`} onClick={(e) => closeModal(e)}>
            <div className="container">
                <button onClick={() => setIsAddContact(false)} className="close"><FaCircleXmark /></button>

                <form onSubmit={submitHandler}>
                    {Inputs.map((input, index) => 
                        <div className="input-wrap" key={index}>
                            <input type={input.type} name={input.name} placeholder={input.placeholder} value={form[name]} onChange={changeHandler} className={styles.input}/>
                            <div className='message'>{message[input.name]}</div>
                        </div>     
                    )}
                
                    <button type="submit" className={`submit ${!isValidate ? 'disabled' : ''}`}>افزودن</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default AddContact;   