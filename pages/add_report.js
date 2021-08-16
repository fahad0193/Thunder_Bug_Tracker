import styles from '../styles/addProject.module.css'
import {bugs} from '../components/bugs'
import { useEffect, useState } from 'react'
import {firebase} from '../firebase'
import {v4 as uuidv4} from 'uuid';
import { useRouter } from 'next/router'

function Add_project() {
    const [user, setUser] = useState(null);

    const [rtBy, setRtBy] = useState('');
    const [prName, setPrName] = useState('');
    const [bug, setBug] = useState('');
    const [dis, setDis] = useState('');
    const [err, setErr] = useState('');
    const [projects, setProjects] = useState([]);




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


      useEffect(()=>{
        const projectsList = [];
        firebase.firestore()
        .collection('projects')
        .get()
        .then(snapshot => snapshot.forEach(doc=> {
              let data = doc.data();
              projectsList.push(data);
            }  
          ));
        setProjects(projectsList);
      }, []);
    


      function addReport(e){
        e.preventDefault();
        firebase.firestore()
        .collection('reports')
        .add({
            userId: uuidv4(),
            project_name: prName,
            bug_status: bug,
            discription: dis,
            reported_by: rtBy,
        })
        .then(
            res =>{
                if(res){
                    setErr('Data Insert Success')
                    clearState()
                }else{
                    setErr('Something wrong')
                }
            }
        )
    }

    function clearState () {
        setDis('');
        setPrName('');
        setRtBy('');
        setBug('');
    }

    return (
        <div className={styles.ap_container}>
            <h6 className="mb-5">Add New Project</h6>
            {err && <div className="alert alert-success"> {err}</div>}
           <form action="">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Reported By</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" value={rtBy} onChange={e => setRtBy(e.target.value)} placeholder="project name..."/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Project Name</label>
                    <select className="form-select" aria-label="Default select example" value={prName} onChange={e => setPrName(e.target.value)}>
                        <option selected>Open this select menu</option>
                        {
                            projects.map((el,idx)=>(
                                <option value={el.project_name} key={idx}>{el.project_name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label" >Bug Status </label>
                    <select className="form-select" aria-label="Default select example" value={bug} onChange={e => setBug(e.target.value)}>
                        <option selected>Open this select menu</option>
                        {
                            bugs.map((el, idx)=>(
                                <option value="1" key={idx}>
                                    {
                                        el.code + `-` + el.status
                                    }
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Discription</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={dis} onChange={e => setDis(e.target.value)}></textarea>
                </div>

                <button className="btn btn-primary col-12" onClick={addReport}>
                    Add Project
                </button>
            </form> 
        </div>
    )
}

export default Add_project
