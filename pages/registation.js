import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { firebase } from '../firebase';
import styles from '../styles/Login.module.css'

function Registation() {

    const route  = useRouter();
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user =>{
            if(user !== null){
                route.replace('/')
            }
        })
    },[])

    const [fname, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [category, setCategory] = useState('');


    const CreateUser = (e) =>{
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(res=> 
        {
            firebase.firestore().collection('users').add({
                uid: res.user.uid,
                name: fname,
                category: category,
                email: email,
            })
            .then(data => console.log(data))
        }
        )

        ClearInput();
    }

    const ClearInput = () =>{
        setEmail('');
        setPass('');
        setCategory('');
    }

    return (
        <div className={styles.login_container}>
            <h4 style={{textAlign: 'center'}} className="mb-4">Login</h4>
            <form action="">
                <div className="mb-4">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" value={fname} onChange={e => setName(e.target.value)}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="">Email</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="">Password</label>
                    <input type="password" className="form-control" value={pass}  onChange={e => setPass(e.target.value)}/>
                </div>

                <div className="mb-4">
                    <select className="form-select" value={category} aria-label="Default select example"  onChange={e => setCategory(e.target.value)}>
                        <option value ="null" selected>Choose Option</option>
                        <option value="Adminsitator">Adminsitator</option>
                        <option value="Developer">Developer</option>
                        <option value="Reporter">Reporter</option>
                    </select>
                </div>

               <div className="d-flex align-items-center justify-content-between">
                    <button className="btn btn-primary col-4" onClick={CreateUser}>
                        Register
                    </button>
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
               </div>
            </form>
        </div>
    );


}

export default Registation
