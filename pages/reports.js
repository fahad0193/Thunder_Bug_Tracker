import Link from 'next/link';
import styles from '../styles/Home.module.css'
import {IoAddOutline} from 'react-icons/io5'
import {AiFillDelete} from 'react-icons/ai'
import {firebase} from '../firebase'
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';

const Home = () =>{
  const [user, setUser] = useState({
    username: '',
    category: '',
  });
  const [reports, setReports] = useState([]);
  const [showData, setShowData] = useState('p');


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
    const reportList = [];
    firebase.firestore()
    .collection('reports')
    .get()
    .then(snapshot => snapshot.forEach(doc=> {
          let data = doc.data();
          reportList.push(data);
        }  
      ));
    setReports(reportList);
  }, []);

  function handleSignOut(e){
    e.preventDefault();
    firebase.auth().signOut().then(()=>{
      route.replace('/login')
    })
  }




  return (
    <div className="project_body">
      <div className={styles.header}>
        {user.category}
        <button className={`${styles._btn} ${styles._log_out}`} onClick={handleSignOut} >Log Out</button>
      </div>
      <div className={styles.nav}>
            <Link href="/">
            <a >
              <button className={`${styles._btn} ${styles._completed_project_btn} me-3`}>
                  Project
              </button>
            </a>
          </Link>

          <Link href="/reports">
            <a >
            <button className={`${styles._btn} ${styles._Reported_project_btn} me-3`}>
            Report
          </button>
            </a>
          </Link>

          {
            user.category === "Adminsitator" && 
              <Link href="/add_report">
                <a className={`${styles.add_project} ms-auto`}> <IoAddOutline /> New Report </a>
              </Link>
          }

          {
            user.category === "Reporter" && 
              <Link href="/add_report">
                <a className={`${styles.add_project} ms-auto`}> <IoAddOutline /> New Report </a>
              </Link>
          }

          
      </div>

      <table>
        <thead>
          <tr>
            <th style={{width: '200px'}}>#</th>
            <th style={{width: '200px'}}>Project Name</th>
            <th style={{width: '120px'}}>Reported by</th>
            <th style={{width: '280px'}}>Bug Status</th>
            <th style={{width: '280px'}}>Discription</th>
          </tr>
        </thead>

        <tbody>
          {
            reports.map((el, idx)=>(
              <tr key={idx}>
                <td style={{fontWeight: 600, fontSize: '13px'}}>{el.userId}</td>
                <td>{el.project_name}</td>
                <td>{el.reported_by}</td>
                <td>{el.bug_status}</td>
                <td>{el.discription}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  );
}
export default Home;