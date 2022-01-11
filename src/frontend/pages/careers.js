import "./careers.css"
export default function Careers(){
  return(
    <>
    <div className="cheading">Apply to Intern with BeFinSavvy</div>
    <div className="cwidth padt50" >
      <p>Full Name *</p>
      <input type="text" style={{width:"100%"}}/> 
      <p className="padt20">Phone *</p>
      <input type="text" style={{width:"100%"}}/> 
      <p className="padt20">Email *</p>
      <input type="text" style={{width:"100%"}}/> 
      <p className="padt20">What role are you interested in? *</p>
      <p><input type="checkbox" style={{width:"15px",height:"15px"}}/> Backend Developer</p>
      <p><input type="checkbox" style={{width:"15px",height:"15px"}}/> Frontend Developer</p>
      <p><input type="checkbox" style={{width:"15px",height:"15px"}}/> Content Writer</p>
      <p><input type="checkbox" style={{width:"15px",height:"15px"}}/> Digital Marketer</p>
      <p><input type="checkbox" style={{width:"15px",height:"15px"}}/> Sales & Business Development</p>
      <p><input type="checkbox" style={{width:"15px",height:"15px"}}/> Others <input type="text" className="inp"/></p>
      <p className="padt20">Why do you want to intern with BeFinSavvy? *<br/>
      <span style={{fontSize:"16px"}}>You can learn about us from our website <a href="www.befinsavvy.com">www.befinsavvy.com.</a> We are also active on Facebook, Instagram and LinkedIn.</span>
      </p>
      <textarea  rows="4" style={{width:"100%"}}>
      </textarea>
      <p className="padt20">What are you most passionate about learning — personally or professionally — and how does this internship help you with this? *</p>
      <textarea  rows="4" style={{width:"100%"}}>
</textarea>
      <p className="padt20">How would your best friend describe you? *</p>
      <textarea  rows="4" style={{width:"100%"}}>
</textarea>
<p className="padt20">Please share the name and phone number of two references who are NOT family members. *<br/>
<span style={{fontSize:"16px"}}>These can be teachers, professors, FLY-Scholar trainers, or anyone you have worked with. They should know you well and be able to tell us more about you.</span>
</p>
      <textarea  rows="4" style={{width:"100%"}}>
</textarea>
<p className="padt20">Upload your CV/RESUME *</p>
<input type= "file" name="Upload" accept = "application/pdf"></input>
    </div>
    </>
  )
}