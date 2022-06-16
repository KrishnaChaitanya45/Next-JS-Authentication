import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  async function passwordHandler(passwordInfo){
   const responce = await fetch('/api/user/change-password',{
      method:'PATCH',
      body:JSON.stringify(passwordInfo),
      headers:{
        'Content-Type':'application/json'
      }

    });
    const data = await responce.json();
    console.log(data);

  }


  return (

    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onPasswordChange={passwordHandler} />
    </section>
  );
}

export default UserProfile;
