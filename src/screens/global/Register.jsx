import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import Sign_img from '../../components/Sign_img';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import authService from '../../authService';

const NAME_REGEX = /^[A-z ]{4,23}$/;
const EMAIL_REGEX = /^\D([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PH_REGEX = /^[0-9]{10}$/;

const Register = () => {
    const navigate = useNavigate()

    const nameRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [phone, setPhone] = useState('')
    const [validPhone, setValidPhone] = useState(false)
    const [phoneFocus, setPhoneFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    useEffect(() => {
        const result = NAME_REGEX.test(name)
        // console.log(result)
        setValidName(result)
    }, [name])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        // console.log(result)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = PH_REGEX.test(phone)
        // console.log(result)
        setValidPhone(result)
    }, [phone])

    useEffect(() => {
        const result = PWD_REGEX.test(password)
        // console.log(result)
        setValidPassword(result)
    }, [password])

    useEffect(() => {
        nameRef.current.focus();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(name)
        // console.log(email)
        // console.log(password)

        const data = {
            name: name,
            email: email,
            phone: phone,
            password: password
        }

        const v1 = NAME_REGEX.test(name);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PH_REGEX.test(phone);
        const v4 = PWD_REGEX.test(password);

        if (!v1 || !v2 || !v3 || !v4) {
            alert('Invalid entry')
        } else {
            // console.log(JSON.stringify(data))
            // localStorage.setItem("userHyscaler", JSON.stringify(data))
            // alert('Data added success')
            // navigate('/login')
            try {
                const registerSuccessful = await authService.register(data)
                if (registerSuccessful) {
                    alert('User Registration successfully');
                    navigate('/login')
                } else {
                    alert('User Registration Failed');
                }
            } catch (err) {
                console.log(err)
            }
        }

    }


    return (
        <>
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className="left_data p-3 mt-3" style={{ width: '100%' }}>
                        <h3 className='text-center col-lg-6'>Sign Up</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicName">
                                <input
                                    // className='form-control mb-2 col-lg-6'
                                    className={`form-control mb-2 col-lg-6 ${name && validName ? 'border-success' : 'border-danger'}`}

                                    type="text"
                                    id="name"
                                    name='name'
                                    placeholder="Enter Your Name"
                                    ref={nameRef} // for auto focus
                                    autoComplete="off"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="namenote"
                                    onFocus={() => setNameFocus(true)}
                                    onBlur={() => setNameFocus(false)}
                                />

                                <p id="namenote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    4 to 24 characters.<br />
                                    Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </p>

                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicName">
                                <input
                                    className={`form-control mb-2 col-lg-6 ${email && validEmail ? 'border-success' : 'border-danger'}`}
                                    type="email"
                                    id="email"
                                    name='email'
                                    placeholder="Enter Your Email"
                                    // autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="emailnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                                <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    For example, example@mail.com<br />
                                    Must begin with a letter.<br />
                                    Must include @ symbol.<br />
                                    Letters, numbers, hyphens allowed.
                                </p>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicName">
                                <input
                                    className={`form-control mb-2 col-lg-6 ${phone && validPhone ? 'border-success' : 'border-danger'}`}
                                    type="tel"
                                    id="phone"
                                    name='phone'
                                    placeholder="Enter Your Phone"
                                    // autoComplete="off"
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    required
                                    aria-invalid={validPhone ? "false" : "true"}
                                    aria-describedby="phonenote"
                                    onFocus={() => setPhoneFocus(true)}
                                    onBlur={() => setPhoneFocus(false)}
                                />
                                <p id="phonenote" className={phoneFocus && phone && !validPhone ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    For example, 123 456 7890<br />
                                    Number between 0 to 9<br />
                                    Length must .<br />
                                </p>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicName">
                                <input
                                    className={`form-control mb-2 col-lg-6 ${password && validPassword ? 'border-success' : 'border-danger'}`}
                                    type="password"
                                    name='password'
                                    id="password"
                                    autoComplete='off'
                                    placeholder='Enter Your Password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                    aria-invalid={validPassword ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                />
                                <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    8 to 24 characters.<br />
                                    Must include uppercase and lowercase letters, a number and a special character.<br />
                                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p>
                            </Form.Group>

                            <button className='col-lg-6 btn btn-success' disabled={!validEmail || !validName || !validPassword ? true : false}>Sign Up</button>
                        </Form>
                        <p className='mt-3'>Already have an account <span><NavLink to='/login'>Sign In</NavLink></span></p>
                    </div>
                    <div className="right_data mt-5" style={{ width: '100%' }}>
                        <Sign_img />
                    </div>
                </section>
            </div>
        </>
    )
}

export default Register