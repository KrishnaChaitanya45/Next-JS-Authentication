import Link from 'next/link';
import { useSession ,signOut } from "next-auth/react"

import classes from './main-navigation.module.css';
import {useRouter} from 'next/router';
import { useState } from 'react';


function MainNavigation() {
  const [loading,setLoading] = useState(true)
  const router = useRouter();
  const { data: session, status } = useSession();
  
  function logout(){
    signOut();
    setLoading(false);
    if(!loading){
      return <p>Loading Please Be Patient....!</p>

    }
    router.replace('/auth');
  }
  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && status!=="loading" &&
           <li>
           <Link href='/auth'>Login</Link>
         </li>
          }
         
          { session && <li>
            <Link href='/profile'>Profile</Link>
          </li>
          }
          {session && 
              <li>
              <button onClick={logout}>Logout</button>
            </li>
            }
      
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
