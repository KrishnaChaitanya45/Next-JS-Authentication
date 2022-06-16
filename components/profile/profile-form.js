import { useRef } from 'react';
import classes from './profile-form.module.css';

function ProfileForm(props) {
  const oldEnteredPasswordRef = useRef();
  const newEnteredPasswordRef = useRef();
  function submithandler(e){
    e.preventDefault();

    const enteredoldPassword = oldEnteredPasswordRef.current.value;
    const enterednewPassword = newEnteredPasswordRef.current.value;
    props.onPasswordChange({
      oldPassword : enteredoldPassword,
      newPassword : enterednewPassword
    });

  }
  return (
    <form className={classes.form} onSubmit={submithandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newEnteredPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldEnteredPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
