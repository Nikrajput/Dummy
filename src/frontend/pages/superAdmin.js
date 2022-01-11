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

function SuperAdmin(){
  let user = firebase.auth().currentUser;
  const uid=user.uid;
  const [state,setState]=useState([]);
  const [futureUser,setFutureUser]=useState([]);
  const [showDashboard,setShowdashboard]=useState(false);
  const [userId,setUserId]=useState();
  const [error,setError]=useState();

  const func=(e)=>{
    e.preventDefault();
    const userData=state[e.target.id];
    setUserId(userData.userId);
    setShowdashboard(true);
  }
  const columns = [
    { title: "Name", field: "name",editable: 'never',render: (rowData) => (
      <a
        href="/"
        target="_blank"
        style={{ fontWeight: '600',color:'black'}}
        id={rowData.tableData.id}
        onClick={func}
      >
        {rowData.name}
      </a>
    ) },
    { title: "Email", field: "email",editable: 'never',type:"email" },
    { title: "Phone Number", field: "phoneNumber",editable: 'never',type: "numeric" },
    { title: "RelationshipManager", field: "rManager",editable: 'never',type:"email" },
    { title: "Payment Status", field: "paymentStatus",editable: 'never', type: "boolean" },
    { title: "Completed", field: "consultationStatus", type: "boolean" }
  ];

  const editable={
    onRowUpdate: (newData, oldData) =>
      new Promise(async (resolve, reject) => {
        const allUserCopy = [...state];
        const index = oldData.tableData.id;
        allUserCopy[index] = newData;
        const status=oldData.userInfo.status ? oldData.userInfo.status : {};
        status['consultationStatus']=newData.consultationStatus?newData.consultationStatus:false;
        db.doCreateStatus(oldData.userId, status);
        setState([...allUserCopy]);
        resolve();
      })
  }
  
  useEffect(() => {
    let allUsers=[];
    const usersRef = ref(db1, `users`)
    onValue(usersRef, (snapshot) => {
      for(let uuid of Object.keys(snapshot.val())){
        let data=snapshot.val()[uuid];
        const personalInfoRef = ref(db1, `users/${data.createdBy}/personal`);
        onValue(personalInfoRef, (snapshot) => {
          if(snapshot.val()){
            data["rManager"]=snapshot.val().Email;
          }
          allUsers.push({name:data.personal.Firstname, email:data.personal.Email, phoneNumber:data.personal.Number,
            createdBy:data.createdBy, userId:uuid, paymentStatus:data.status ? data.status.paymentStatus : false,
            consultationStatus:data.status ? data.status.consultationStatus : false, rManager:data.rManager,
            userInfo:data});
        });
      }
      setState([...allUsers]);
    })
  }, [])

  return(
    <div >
      {!showDashboard && <div style={{ maxWidth: "90%",padding:"100px"}}>
        <MaterialTable 
          icons={tableIcons} 
          title={<div>
            <Typography style={{padding:"10px",fontWeight:800,fontSize:"40px"}}>Users</Typography>
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
  if(authUser && (authUser.uid == "LGF3tFfZoYdOeKt7lBrCq8dJjG13" || authUser.uid == "bGd0POEByKZF7eOHfFC0jzr0CoQ2"))return true;
  return false;
};

export default withAuthorization(authCondition)(SuperAdmin);
