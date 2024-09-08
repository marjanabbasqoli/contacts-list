import { useEffect , useState } from "react";

import { FaCircleXmark } from "react-icons/fa6";

import { Inputs } from "../../constansts/Inputs";

import styles from "./EditContact.module.scss";
import SureBox from "../SureBox/SureBox";

const validEmailRegex = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;
const validPhoneRegex = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;

function EditContact({isEditContact , setIsEditContact , editItemId , contacts , setSearchedContact}) {
    const [form , setForm] = useState(contacts.find(c => c.id === editItemId));
    const [message , setMessage] = useState({
        name : "",
        email: "",
        phone: "",
        job: ""
    });
    const [isValidate , setIsValidate] = useState(false);
    const [showBox, setShowBox] = useState(false);

    useEffect(() => {
        const isEmpty = Object.values(form).splice(0,3).includes('');
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
        name !== 'job' && setMessage({ ...message, [name]: !value ? "لطفا اطلاعات خو را وارد نمایید" : "" });

        const isExist = name === "name" && value && contacts.find(c => c.name.includes(value));
        isExist && setMessage({ ...message, name: "این نام قبلا اضافه شده است"});

        const validEmail = name === "email" && value && !value.match(validEmailRegex);
        validEmail && setMessage({ ...message, email: "لطفا یک ایمیل معتبر وارد کنید" });
       
        const validPhone = name === "phone" && value && !value.match(validPhoneRegex);
        validPhone && setMessage({ ...message, phone: "لطفا یک شماره تلفن معتبر وارد نمایید" });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setShowBox(true);
    }

    const sureHandler = (sure) => {
        sure && add();
        setShowBox(false);
        setIsEditContact(false);
    }

    const add = () => {
        if(isValidate) {
            const itemIndex = contacts.findIndex(c => c.id === editItemId);
            contacts[itemIndex] = {...form};
            localStorage.setItem('contacts' , JSON.stringify(contacts));
            setSearchedContact(contacts);
        } 
    }

    const closeModal = (e) => {
        !e.target.closest('.container') && setIsEditContact(false)
    }

  return (
    <div className={`modal ${isEditContact ? 'show-modal' : ''}`} onClick={(e) => closeModal(e)}>
        <div className="container">
            <button onClick={() => setIsEditContact(false)} className="close"><FaCircleXmark /></button>

            <form onSubmit={submitHandler}>
                {Inputs.map((input, index) =>
                    <div className="input-wrap" key={index}>
                        <input type={input.type} name={input.name} placeholder={input.placeholder} value={form[input.name]} onChange={changeHandler} className={styles.input}/>
                        <div className='message'>{message[input.name]}</div>
                    </div>   
                )}
                <button type="submit" className={`submit ${!isValidate ? 'disabled' : ''}`}>ویرایش</button>
            </form>

            <SureBox showBox={showBox} sureHandler={sureHandler} boxTitle={"آیا اطلاعات مخاطب ویرایش شود؟"} />
        </div>
        
    </div>
    
  )
}

export default EditContact