import { useEffect , useState } from "react";
import styles from "./EditContact.module.scss";
import AddContact from "../AddContact/AddContact";

const validEmailRegex = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;
const validPhoneRegex = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;

function EditContact({isEditContact , setIsEditContact , editItemId , contacts , setSearchedContact}) {
    const [form , setForm] = useState(contacts.find(c => c.id === editItemId));
    const [showBox, setShowBox] = useState(false);
    const [isValidate , setIsValidate] = useState(false);
    const [message , setMessage] = useState({
        name : "",
        email: "",
        phone: "",
        job: ""
    });

    useEffect(() => {
        const isEmpty = Object.values(form).includes('');
        setIsValidate(!(isEmpty || !form.email.match(validEmailRegex) || !form.phone.match(validPhoneRegex)) ? true : false);
    }, [form]);

    const changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({...form , [name]: value});
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

  return (
    <div className={`modal ${isEditContact ? 'show-modal' : 'hide-modal'}`}>
        <div className="container">
            <button onClick={() => setIsEditContact(false)} className="circle-icon">X</button>

            <form onSubmit={submitHandler}>
                <input type="text" placeholder="name" name="name" value={form.name} onChange={changeHandler} className="star"/>
                <div className='message'>{message.name}</div>
                <input type="email" placeholder="email" name="email" value={form.email} onChange={changeHandler}/>
                <div className='message'>{message.email}</div>
                <input type="tel" placeholder="phone" name="phone" value={form.phone} onChange={changeHandler}/>
                <div className='message'>{message.phone}</div>
                <input type="text" placeholder="job" name="job" value={form.job} onChange={changeHandler}/>
                <div className='message'>{message.job}</div>
                <button type="submit" className={`theme-button ${!isValidate ? styles.disabled : ''}`}>ویرایش</button>
            </form>

            {showBox &&
            <div>
            are you sure?
            <button onClick={() => sureHandler(true)}>yes</button>
            <button onClick={() => sureHandler(false)}>no</button>
            </div>}
        </div>
        
    </div>
    
  )
}

export default EditContact