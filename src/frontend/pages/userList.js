import {react,useState,useEffect} from "react"
import MaterialTable,{ MTableBodyRow } from "material-table";
import tableIcons from "./MaterialTableIcons";
import {db1} from "../../firebase/firebase"
import {db} from "../../firebase"
import { ref, onValue } from 'firebase/database';
import firebase from "firebase/compat/app";
import { auth} from "../../firebase";
import withAuthorization from "../authentication/withAuthorization";
import "../components/App.css"
import {Typography } from '@material-ui/core'
import Mainpage from "./personalprofile";

const generator = require('generate-password');

function UserList(){
  let user = firebase.auth().currentUser;
  const uid=user.uid;
  const [state,setState]=useState([]);
  const [futureUser,setFutureUser]=useState([]);
  const [showDashboard,setShowdashboard]=useState(false);
  const [userId,setUserId]=useState();
  const [error,setError]=useState();

  const displayError= (message) => {
    setError(message);
    const timeId = setTimeout(() => {
      setError('');
    }, 2000)
  
    return () => {
      clearTimeout(timeId)
    }
  }
  const func=(e)=>{
    e.preventDefault();
    const userData=state[e.target.id];
    if(userData.createdBy){
      setUserId(userData.userId);
      setShowdashboard(true);
    }
    else{
      const password = generator.generate({
        length: 10,
        numbers: true
      });
      auth.doCreateUserWithEmailAndPassword(userData.email, password)
        .then(authUser => {
          let userInfo={};
          if(userData.email){
            userInfo.Email=userData.email;
          }
          if(userData.phoneNumber){
            userInfo.Number=userData.phoneNumber;
          }
          if(userData.name){
            userInfo.Firstname=userData.name;
          }
          db.docreatepersonal(authUser.user.uid, userInfo);
          db.userCreatedBy(authUser.user.uid,uid);
          let dataCopy=[...futureUser];
          dataCopy = dataCopy.filter(item => item.email !== userData.email);
          setFutureUser([...dataCopy]);
          db.doCreateFutureUser(uid,dataCopy); 
          const status={};
          status['paymentStatus']=userData.paymentStatus?userData.paymentStatus:false;
          db.doCreateStatus(authUser.user.uid, status);
          window.location.href="/my-profile";
        })
        .catch(err => {
          displayError(err.message);
        })
    }
  }
  const columns = [
    { title: "Name", field: "name",render: (rowData) => (
      <a
        href="/"
        target="_blank"
        style={{ fontWeight: '600',color:rowData.createdBy?'black':'blue' }}
        id={rowData.tableData.id}
        onClick={func}
      >
        {rowData.name}
      </a>
    ) },
    { title: "Email", field: "email",type:"email" },
    { title: "Phone Number", field: "phoneNumber", type: "numeric" },
    { title: "Payment Status", field: "paymentStatus", type: "boolean" },
  ];

  const editable={
    onRowAdd: (newData) =>
      new Promise(async(resolve, reject) => {
        const dataCopy = [...futureUser];
        dataCopy.unshift(newData);
        setFutureUser(dataCopy);
        db.doCreateFutureUser(uid,dataCopy); 
        setState([newData,...state]);
        resolve();
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise(async (resolve, reject) => {
        const allUserCopy = [...state];
        const index = oldData.tableData.id;
        if(!newData.phoneNumber){
          delete newData.phoneNumber;
        }
        allUserCopy[index] = newData;
        if(oldData.createdBy){
          if(newData.name && newData.email && newData.phoneNumber){
            const data=oldData.userInfo.personal;
            data.Email=newData.email;
            data.Number=newData.phoneNumber;
            data.Firstname=newData.name;
            db.docreatepersonal(oldData.userId, data);
            const status=oldData.userInfo.status ? oldData.userInfo.status : {};
            status['paymentStatus']=newData.paymentStatus?newData.paymentStatus:false;
            db.doCreateStatus(oldData.userId, status);
            setState([...allUserCopy]);
          }
          else{
            displayError('Cannot delete details for registered user');
          }
        }
        else{
          let allFutureUserCopy = [...futureUser];
          if(!newData.name && !newData.email && !newData.phoneNumber){
            allFutureUserCopy.splice(index,1);
            allUserCopy.splice(index,1);
          }
          else{
            allFutureUserCopy[index] = newData;
          }
          db.doCreateFutureUser(uid,allFutureUserCopy);
          setFutureUser([...allFutureUserCopy]);
          setState([...allUserCopy]);
        }
        resolve();
      })
  }
  
  useEffect(() => {
    let allUsers=[];
    const dbr = ref(db1,`futureUsers/${uid}`);
    onValue(dbr, function(snapshot) {
      if(snapshot.val()){
        setFutureUser(snapshot.val().user);
        allUsers=snapshot.val().user;
      }
    })
    const usersRef = ref(db1, `users`)
    onValue(usersRef, (snapshot) => {
      for(let uuid of Object.keys(snapshot.val())){
        let data=snapshot.val()[uuid];
        if(data.createdBy === uid){
          allUsers.push({name:data.personal.Firstname,email:data.personal.Email,phoneNumber:data.personal.Number,
                        createdBy:data.createdBy,userId:uuid,paymentStatus:data.status?data.status.paymentStatus:false,
                        userInfo:data});
        }
      }
      setState([...allUsers]);  
    })
  }, [])


  return(
    <div >
      {!showDashboard && <div style={{ maxWidth: "80%",padding:"100px"}}>
        <div style={{padding:"20px"}}>
          <Typography style={{color:'red',fontWeight:800,fontSize:"24px"}}>{error}</Typography>
        </div>
        <MaterialTable 
          icons={tableIcons} 
          title={<div>
            <Typography style={{padding:"10px",fontWeight:800,fontSize:"40px"}}>Users</Typography>
            <Typography style={{ fontWeight: '600',color:'blue',fontSize:"13px"}}>Unregistered</Typography>
            <Typography style={{ fontWeight: '600',color:'black',fontSize:"13px"}}>Registered</Typography>
          </div>}
          columns={columns} 
          data={state}
          editable={editable}
          options={
            {addRowPosition: 'first'}
          }
        />
      </div>}
      {showDashboard && <Mainpage userId={userId} />}
    </div>
  )

}

const authCondition = authUser => {
  if(authUser && (authUser.uid == "LGF3tFfZoYdOeKt7lBrCq8dJjG13" || authUser.uid == "m87EMD2kiNOqPXg5j05SDZ5p1wj2" || authUser.uid == "bGd0POEByKZF7eOHfFC0jzr0CoQ2" || authUser.uid == "mqvMR2aoroVrbcLyuefZ7pwDV0H2"))return true;
  return false;
};

export default withAuthorization(authCondition)(UserList);
