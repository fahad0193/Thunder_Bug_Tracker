import Link from 'next/link';
import styles from '../styles/Login.module.css'
import {firebase} from '../firebase';
import { useEffect, useState } from 'react';
import { useRouter  } from 'next/router';

const Login = () =>{
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [err, setErr] = useState('');
    const route  = useRouter()

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user =>{
            if(user!== null){
                route.replace('/')
            }
        })
    },[] )


    function  handleLogin(e){
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(res => {
           firebase.firestore()
           .collection('users')
           .where('uid', '==', res.user.uid)
           .get()
           .then(snapshot => snapshot.forEach(doc => {
                   if(doc!==null){
                    route.replace('/')
                   }else{
                       setErr('email or password incorrect')
                   }
                }   
            ))
        })
        clearState();
    }

    function clearState(){
        setEmail('');
        setPass('');
    }




    return (
        <div className={styles.login_container}>
            <h4 style={{textAlign: 'center'}} className="mb-4">Login</h4>
            <form action="">
                {err && <div className="alert alert-warning">{err}</div>}
                <div className="mb-4">
                    <label htmlFor="">Email</label>
                    <input type="email" className="form-control" onChange={e=> setEmail(e.target.value)}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="">Password</label>
                    <input type="password" className="form-control" onChange={e=> setPass(e.target.value)}/>
                </div>

               <div className="d-flex align-items-center justify-content-between">
                    <button className="btn btn-primary col-4" onClick={handleLogin}>
                        login
                    </button>
                    <Link href="/registation">
                        <a>Register</a>
                    </Link>
               </div>
            </form>
        </div>
    );
}


export default Login;