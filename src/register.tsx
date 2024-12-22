//import React, { useState } from "react";

import { useState } from "react";

const initialValues = {
    fName: "",
    lName: "",
    email: "",
    birthdate: "",
    phonenumber: "",
    gender: "",
    hobby: "",
    age: "",
    hobbies: [] as string[],
};
const errorsvalue = {
    fName: "",
    lName: "",
    email: "",
    birthdate: "",
    phonenumber: "",
    gender: "",
    hobby: "",
    age: "",
};
function Register() {
    const [formValues, setFormValues] = useState(initialValues);
    const[errors,seterrors]=useState(errorsvalue);
    

    const handleInput = (e: any) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    };

    const addHobby = () => {
        //check length
        if (!formValues.hobby.trim() || formValues.hobby.trim().length<5) {
            seterrors({...errors,hobby:"Hobby must be at least 5 characters long."})
            return;
        }
        //check duplicate
        if (formValues.hobbies.includes(formValues.hobby.trim())) {
            seterrors({...errors,hobby:"Hobby is already in the list."})
            return;
        }
        
        setFormValues({
            ...formValues,
            hobbies: [...formValues.hobbies, formValues.hobby.trim()],
            hobby: "",
        });        
            
        seterrors({...errors,hobby:""});
    };

    const removeHobby = (index: number) => {
        const newArr = formValues.hobbies.filter((_, i) => i !== index)
        setFormValues({ ...formValues, hobbies: newArr });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newerror:any={};

        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(formValues.email.length<5 || !emailReg.test(formValues.email))
            newerror.email="Please enter a valid email address.";

        if(formValues.fName.length < 5)
            newerror.fName="First name must be at least 5 characters long.";
        else if(formValues.fName.charAt(0) !== formValues.fName.charAt(0).toUpperCase())
            newerror.fName="First name must start with a capital letter.";
        
        if(formValues.lName.length < 5)
            newerror.lName="Last name must be at least 5 characters long.";
        else if(formValues.lName.charAt(0) !== formValues.lName.charAt(0).toUpperCase())
            newerror.lName="Last name must start with a capital letter.";
        
        const phone=/^(?:\+20\s?)?(01[0-5])\d{8}$/;
        if(!phone.test(formValues.phonenumber.trim()))
            newerror.phonenumber="Please enter a valid phone number.";

        const agevalue = parseInt(formValues.age , 10);
        if(agevalue < 18 || agevalue > 77)
            newerror.age= "Age must be between 18 and 77.";


        seterrors(newerror);


        if(Object.keys(newerror).length===0){
            console.log("value of the form: ",formValues);
        }

    };


    return (
        <div className="form">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="name-box">
                    <div className="input-r">
                        <p>First Name</p>
                        <input
                            type="text"
                            placeholder="Enter first name"
                            required
                            spellCheck="false"
                            name="fName"
                            value={formValues.fName}
                            onChange={handleInput}
                        />
                        {errors.fName && <span className="error">{errors.fName}</span>}
                    </div>
                    <div className="input-r">
                        <p>Last Name</p>
                        <input
                            type="text"
                            placeholder="Enter last name"
                            required
                            spellCheck="false"
                            name="lName"
                            value={formValues.lName}
                            onChange={handleInput}
                        />
                        {errors.lName && <span className="error">{errors.lName}</span>}
                    </div>
                </div>
                <div className="input-r">
                    <p>Email</p>
                    <input
                        type="text"
                        placeholder="Enter email"
                        required
                        spellCheck="false"
                        name="email"
                        value={formValues.email}
                        onChange={handleInput}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="name-box">
                    <div className="input-r">
                        <p>Phone Number</p>
                        <input
                            type="text"
                            placeholder="Enter phone number"
                            required
                            spellCheck="false"
                            name="phonenumber"
                            value={formValues.phonenumber}
                            onChange={handleInput}
                        />
                        {errors.phonenumber && <span className="error">{errors.phonenumber}</span>}
                    </div>
                    <div className="input-r">
                        <p>Birth Date</p>
                        <input
                            type="date"
                            required
                            name="birthdate"
                            value={formValues.birthdate}
                            onChange={handleInput}
                        />
                    </div>
                </div>
                <div className="name-box">
                    <div className="input-r">
                        <p>Age</p>
                        <input
                            type="number"
                            placeholder="Enter your age"
                            required
                            spellCheck="false"
                            name="age"
                            value={formValues.age}
                            onChange={handleInput}
                        />
                        {errors.age && <span className="error">{errors.age}</span>}
                    </div>
                    <div className="input-r">
                        <p>Country</p>
                        <select name="country" id="country">
                            <option value="" disabled selected>Select a country</option>
                            <option value="eg">Egypt</option>
                            <option value="italy">Italy</option>
                            <option value="germany">germany</option>
                            <option value="UAE">UAE</option>
                        </select>
                    </div>
                </div>

                <div className="hobby-section">
                    <p>Hobby</p>
                    <div className="input-r">
                        <input
                            type="text"
                            placeholder="Enter your hobby"
                            name="hobby"
                            value={formValues.hobby}
                            onChange={handleInput}
                        />
                        <button className="add-hobby-btn" type="button" onClick={addHobby}>Add Hobby</button>
                    </div>
                    {errors.hobby && <span className="error">{errors.hobby}</span>}

                    {formValues.hobbies.length > 0 &&

                        <div className="hobbies-list">
                            <p>Saved Hobbies:</p>
                            <ul>
                                {formValues.hobbies.map((hobby, index) => (
                                    <li key={index}>{hobby}
                                        <button type="button" onClick={() => removeHobby(index)}>Remove</button>
                                    </li>
                                ))}
                            </ul>
                        </div>}
                </div>

                <div className="gender-box">
                    <p>Gender</p>
                    <div className="gender-select">
                        <div className="gender">
                            <input type="radio" id="female" value="female" name="gender" onChange={handleInput} />
                            <label htmlFor="female">Female</label>
                        </div>
                        <div className="gender">
                            <input type="radio" id="male" value="male" name="gender" onChange={handleInput} />
                            <label htmlFor="male">Male</label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="reg-btn" onClick={handleSubmit}>Register</button>

                <div className="login-link">
                    <p>Do you have an account? <a href="/login">Login</a></p>
                </div>
            </form>
        </div>
    );
}

export default Register;
