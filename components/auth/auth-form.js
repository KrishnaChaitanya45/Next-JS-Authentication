
import { useState , useRef } from 'react';
import classes from './auth-form.module.css';
import {signIn} from 'next-auth/react';
import { useRouter } from 'next/router';


function AuthForm() {
  const router = useRouter();
  const emailInput = useRef();
  const passwordInput = useRef();
  const [isLogin, setIsLogin] = useState(true);

  async function CreateUser(enteredemail , enteredpassword){

    try{
      const responce = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email:enteredemail,
          password:enteredpassword,
        }),
      });
      const data = await responce.json();
      console.log(data)
      
    
      if(!responce.ok){
        throw new Error('Something Went Wrong');

        
      }
      return data;
    } catch(error){
      console.log(error)
    }
  }
  async function submitHandler(event){
    const EmailEntered = emailInput.current.value;
    const PasswordEntered = passwordInput.current.value;
  
    event.preventDefault();
    if(isLogin){
      const result =await signIn('credentials',{
        redirect:false,
        email:EmailEntered,
        password:PasswordEntered
      });
     
      if(!result.error){
        router.replace('/profile');
      }
     

    }
    else{

    
      try{
        const result = await CreateUser(EmailEntered,PasswordEntered);
       console.log(result);

      }catch(error){
        console.log("Something is messy")
      }


    }

  }

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }
  

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInput}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required  ref={passwordInput}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
