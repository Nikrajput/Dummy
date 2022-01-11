import { NavLink, Link } from "react-router-dom";

export default function Data(props){
  var personal={Firstname:"",Lastname:"",Email:"",Dateofbirth:"",Age:0,City:"",Financialliteracy:"",Riskprofile:"",Number:"",Status:"Single"}
  var income={Allow:0,Basic:0,Fund:0,Hra:0,Incometax:0,Professionaltax:0,Total:0,Netincome:0}
  var investments={Other:0,Cash:0,Fixeddeposit:0,gold:0,Mutualfunds:0,Shares:0,Cryptocurrency:0}
  let monthlyexpenditure={Rent:0,Bills:0,Groceries:0,Transport:0,Medical:0,Domestic:0,Emi:0,Otherexpenses:0,Subtotal1:0,Shopping:0,Gym:0,Entertainment:0,Subscription:0,Others:0,Subtotal2:0,Total:0,Savings:0,Unaccountedincome:0,}

  if(props.data.personal){
    Object.assign(personal,props.data.personal)
  }
  if(props.data.income){
    Object.assign(income,props.data.income)
  }
  if(props.data.monthlyexpenditure){
    Object.assign(monthlyexpenditure,props.data.monthlyexpenditure)
  }
  if(props.data.investments){
    Object.assign(investments,props.data.investments)
  }

  return(
    <tr>
      <td className="td" >{personal.Firstname}</td>
      <td className="td" >{personal.Lastname}</td>
      <td className="td" >{personal.Email}</td>
      <td className="td" >{personal.Number}</td>
      <td className="td" >{personal.Requested}</td>
      <td className="td" ><Link to={{
        pathname:"/userfulldata",
        userdata:{personal:personal,income:income,monthlyexpenditure:monthlyexpenditure,investments:investments} }}>View full data</Link></td>
    </tr>
  )
}
