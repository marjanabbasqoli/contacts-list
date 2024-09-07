import { useState , useEffect } from "react";
import { toast } from 'react-toastify';

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
        setIsValidate(!(isEmpty || !form.email.match(validEmailRegex) || !form.phone.match(validPhoneRegex)) ? true : false);
    }, [form]);

    const changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value.trim();
        setForm(form => ({...form , [name]: value}));
        validation(name , value , message , setMessage , setIsValidate);
    }

    const validation = (name, value, message, setMessage, setIsValidate) => {
        setMessage({ ...message, [name]: !value ? "plase fill field" : "" });

        const validEmail = name === "email" && value && !value.match(validEmailRegex);
        validEmail && setMessage({ ...message, email: "please enter a valid email" });
       
        const validPhone = name === "phone" && value && !value.match(validPhoneRegex);
        validPhone && setMessage({ ...message, phone: "please enter a valid phone" });
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

  return (
    <> 
        <div className={`modal ${isAddContact ? 'show-modal' : 'hide-modal'}`}>
            <div className="container">
                <button onClick={() => setIsAddContact(false)} className="circle-icon">X</button>

                <form onSubmit={submitHandler}>
                    <input type="text" placeholder="نام" name="name" value={form.name} onChange={changeHandler} onSelect={changeHandler} className="star"/>
                    <div className='message'>{message.name}</div>
                    <input type="email" placeholder="ایمیل" name="email" value={form.email} onChange={changeHandler}/>
                    <div className='message'>{message.email}</div>
                    <input type="number" placeholder="تلفن" name="phone" value={form.phone} onChange={changeHandler}/>
                    <div className='message'>{message.phone}</div>
                    <input type="text" placeholder="تخصص" name="job" value={form.job} onChange={changeHandler} />
                    <div className="message">{message.job}</div>
                    <button type="submit" className={`theme-button ${!isValidate ? styles.disabled : ''}`}>افزودن</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default AddContact   