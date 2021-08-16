import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {firebase} from '../firebase'
import styles from '../styles/addProject.module.css'
import {v4 as uuidv4} from 'uuid';

function Add_project() {
    const [user, setUser] = useState(null);

    const [projectName, setProjectName] = useState('');
    const [devName, setDevName] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dis, setDis] = useState('');
    const [err, setErr] = useState('');


    const route  = useRouter();
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user=>{
          if(user===null){
            route.replace('/login')
          }else{
            firebase.firestore()
            .collection('users')
            .where('uid','==', user.uid)
            .get()
            .then(snapshot => snapshot.forEach(doc=>{
              setUser(doc.data())
            }))
          }
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    function addProject(e){
        e.preventDefault();
        firebase.firestore()
        .collection('projects')
        .add({
            userId: uuidv4(),
            project_name: projectName,
            developer_name: devName,
            ending_date: endDate,
            discription: dis,
            project_manager: user.name,
        })
        .then(
            res =>{
                if(res){
                    setErr('Data Insert Success')
                    handleClear()
                }else{
                    setErr('Something wrong')
                }
            }
        )
    }

    function handleClear () {
        setProjectName('');
        setDevName('');
        setEndDate('');
        setDis('');
    }
    return (
        <div className={styles.ap_container}>
            <h6 className="mb-5">Add New Project</h6>
            {err && <div className="alert alert-success"> {err}</div>}
           <form action="">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Project Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleFormControlInput1" 
                        onChange={e=> setProjectName(e.target.value)} 
                        placeholder="project name..."
                        value={projectName}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Developer Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleFormControlInput1" 
                        onChange={e=> setDevName(e.target.value)} 
                        placeholder="MR. Jhon"
                        value={devName}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">End Date </label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleFormControlInput1" 
                        onChange={e=> setEndDate(e.target.value)} 
                        placeholder="dd-mm-yyyy"
                        value={endDate}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Discription</label>
                    <textarea 
                        className="form-control" 
                        id="exampleFormControlTextarea1" 
                        rows="3"
                        onChange={e=> setDis(e.target.value)}
                        value={dis}
                    >
                    </textarea>
                </div>

                <button className="btn btn-primary col-12" onClick={addProject}>
                    Add Project
                </button>
            </form> 
        </div>
    )
}

export default Add_project
