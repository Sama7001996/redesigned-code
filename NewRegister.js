import React,{useState} from 'react'
import { validEmail, validPassword } from './RegularExpresion';
import * as Icon from 'react-bootstrap-icons';
import '../newRegister.css'
import GoogleLogin from 'react-google-login'
import GoogleButton from 'react-google-button'
import axios from 'axios'

function NewRegister() {
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
        ? JSON.parse(localStorage.getItem('loginData'))
        : null
    );
    const [formValues, setFormValues] = useState({
        
        FirstName: "",
        LastName: "",
        Email: "",
        UserName: "",
        password: "",
        confirmPassword: ""

    });

    const [formValuesErrors, setFormValuesErrors] = useState({
        FirstNameErr: null,
        LastNameErr: null,
        EmailErr: null,
        UserNameErr: null,
        passwordErr: null,
        confirmPasswordErr: null

    });

    const handleFormChange = (event) => {
        switch (event.target.name) {
            case "Email":
                setFormValues({
                    ...formValues,
                    Email: event.target.value,
                });
                setFormValuesErrors({
                    ...formValuesErrors,
                    EmailErr:
                        event.target.value.length === 0
                            ? "This field is required"
                            : validEmail.test(event.target.value) === false ? " Email must be as xxx@xxx.xxx"
                                : null,
                });
                break;
            case "UserName":
                setFormValues({
                    ...formValues,
                    UserName: event.target.value,
                });
                setFormValuesErrors({
                    ...formValuesErrors,
                    UserNameErr:
                        event.target.value.length === 0
                            ? "This field is required"
                            : null,
                });
                break;
                case "FirstName":
                    setFormValues({
                        ...formValues,
                        FirstName: event.target.value,
                    });
                    setFormValuesErrors({
                        ...formValuesErrors,
                        FirstNameErr:
                        event.target.value.length === 0 ?
                        "This field is required"
                        :event.target.value.length < 3 ?
                        "First name must be at least 3 characters"
                        : null,
                    });
                    break;
                    case "LastName":
                    setFormValues({
                        ...formValues,
                        LastName: event.target.value,
                    });
                    setFormValuesErrors({
                        ...formValuesErrors,
                        LastNameErr:
                        event.target.value.length === 0 ?
                        "This field is required"
                        :event.target.value.length < 3 ?
                        "Last name must be at least 3 characters"
                        : null,
                    });
                    break;

            case "password":
                setFormValues({
                    ...formValues,
                    password: event.target.value,
                });
                setFormValuesErrors({
                    ...formValuesErrors,
                    passwordErr:
                    event.target.value.length === 0
                        ? "This field is required"
                        : validPassword.test(event.target.value) === false
                        ? "Password must be as P@ssword123"
                        : null,
                });
                break;
            case "confirmPassword":
                setFormValues({
                    ...formValues,
                    confirmPassword: event.target.value,
                });
                setFormValuesErrors({
                    ...formValuesErrors,
                    confirmPasswordErr:
                        event.target.value.length === 0
                        ? "This field is required"
                        : event.target.value !== formValues.password
                        ? "It must match passsword"
                        : null,
                });
                break;
            default:
                break;
        }
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (
            !formValuesErrors.EmailErr &&
            !formValuesErrors.passwordErr

        ) {
            axios.post('http://localhost:3000/users',({}))
            .then(res => {
            console.log(res);
            console.log(res.data);
        })
        }
    };

    const handleFailure = (result)=>{
    }
    const handleLogin = async(googleData)=>{
        const res = await fetch('/api/google-login', {
            method: 'POST',
            body: JSON.stringify({
            token: googleData.tokenId,
            }),
            headers: {
            'Content-Type': 'application/json',
            },});
            const data = await res.json();
            setLoginData(data);
            localStorage.setItem('loginData', JSON.stringify(data));
    };
    const handleLogout = () => {
        localStorage.removeItem('loginData');
        setLoginData(null);
    };
return (
    <>
    <section className="vh-500" style={{backgroundColor:" #eee;"}}>
<div className="container h-500">
    <div className="row d-flex justify-content-center align-items-center h-500">
        <div className="col-lg-12 col-xl-11">
            <div className="card-body p-md-5">
            <div id="main-card" className="row justify-content-center">
                <div id="form-style" className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p id="join-us" className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Join Us</p>
                <form  onSubmit={(e) => handleSubmitForm(e)} className="mx-1 mx-md-4">
                <div className="d-flex flex align-items-center mb-4">
                    <div className="my-icon"> <Icon.PersonFill size={35} color="#7DCEA0 " position=""/></div>
                    
                    <div className="form-outline flex-fill mb-0">
                        <input 
                        placeholder="First Name"
                        type="text" 
                        id="firstNameInput" 
                        className="form-control " 
                        value={formValues.FirstName}
                        onChange={(e) => handleFormChange(e)}
                        name="FirstName"
                        />
                        {
                        formValuesErrors.FirstNameErr&&(
                            <div id="FirstNameHelp" className="form-text text-danger border-danger">
                                {formValuesErrors.FirstNameErr}
                            </div>
                        )}
                    </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                    <Icon.Person size={35} color="#7DCEA0  "/>
                    <div className="form-outline flex-fill mb-0">
                        <input placeholder="Last Name"
                    type="text" 
                    id="lastNameInput" 
                    className="form-control "
                    value={formValues.LastName}
                    onChange={(e) => handleFormChange(e)}
                    name="LastName"
                    />
                    {formValuesErrors.LastNameErr&&(
                        <div id="LastNameHelp" className="form-text text-danger">
                            {formValuesErrors.LastNameErr}
                        </div>
                    )}
                        
                    </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                    <Icon.PersonFill size={35} color="#7DCEA0  "/>
                    <div className="form-outline flex-fill mb-0">
                        <input type="text"
                    placeholder="User Name"
                    className="form-control "
                    id="UserNameInput"
                    aria-describedby="UserNameHelp"
                    value={formValues.UserName}
                    onChange={(e) => handleFormChange(e)}
                    name="UserName"
                        />
                        {formValuesErrors.UserNameErr && (
                    <div id="UserNameHelp" className="form-text text-danger ">
                        {formValuesErrors.UserNameErr}
                    </div>
                )}
                        
                    </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                    <Icon.EnvelopeFill size={30} color="#7DCEA0 " position="absolute"/>
                    <div className="form-outline flex-fill mb-0">
                        <input type="email"
                    placeholder="Email"
                    className="form-control "
                    id="EmailInput"
                    aria-describedby="EmailHelp"
                    value={formValues.Email}
                    onChange={(e) => handleFormChange(e)}
                    name="Email"
                    />
                    {formValuesErrors.EmailErr && (
                    <div id="EmailHelp" className="form-text text-danger">
                        {formValuesErrors.EmailErr}
                    </div>
                )}
                    </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                    <Icon.LockFill size={35} color="#7DCEA0  "/>
                    <div className="form-outline flex-fill mb-0">
                        <input type="password"
                    placeholder='Password'
                    className="form-control "
                    id="passwordInput"
                    aria-describedby="passwordHelp"
                    value={formValues.password}
                    onChange={(e) => handleFormChange(e)}
                    name="password"
                    />
                    {formValuesErrors.passwordErr && (
                    <div id="passwordHelp" className="form-text text-danger">
                        {formValuesErrors.passwordErr}
                    </div>
                )}
                        
                    </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                    <Icon.KeyFill size={35} color="#7DCEA0 "/>
                    <div className="form-outline flex-fill mb-0">
                        <input type="password"
                    placeholder='Repeat Password'
                    className="form-control "
                    id="confirmPasswordInput"
                    aria-describedby="confirmPasswordHelp"
                    value={formValues.confirmPassword}
                    onChange={(e) => handleFormChange(e)}
                    name="confirmPassword"
                    />
                    {formValuesErrors.confirmPasswordErr && (
                    <div id="confirmPasswordHelp" className="form-text text-danger">
                        {formValuesErrors.confirmPasswordErr}
                    </div>
                )}
                        
                    </div>
                    </div>

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button 
                    style={{backgroundColor:"#7DCEA0 ",borderColor:"#7DCEA0 "}} 
                    type="button" 
                    className="btn btn-primary btn-lg"
                    disabled={
                        formValuesErrors.EmailErr ||
                        formValuesErrors.passwordErr 
                    }
                    >Register</button>
                    </div>
                    {
                    loginData?(
                    <div>
                        <h3>You logged in as {loginData.email}</h3>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
            ):(
                <GoogleLogin
            clientId='678175724274-mfoptnppuqqf84525pqv0gk173jdl4e8.apps.googleusercontent.com'
            render={renderProps => (
                <GoogleButton style={{width: '100%', 
                backgroundColor: 'white',boxShadow: '0 0 0 0.5'
                ,marginBottom:"70px" ,color: '#A04000 ',borderColor: '#A04000 '}} 
                onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    Sign in with Google</GoogleButton>
            )}
            className="btn btn-lg btn-primary"
            id="btn"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
            >
            </GoogleLogin>
            )
            }
                </form>

                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 align-items-center order-1 order-lg-2" 
                style={{backgroundColor:"white ",borderRadius:"20px"}}>
                    <img src="https://www.nicepng.com/png/full/4-47345_picture-royalty-free-stock-painting-feather-phoenix-colorful.png" style={{width:"100%",height:"100%"}}/>
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>

</section>
    </>
)
}

export default NewRegister