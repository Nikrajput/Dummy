import Howdoesitworks from "../../assets/images/Howdoesitworks.png"
export const Elephant=()=>
 {
   return(
  <div className="ele-wrapper">
    <div className="ele-tail"></div>
    <div className="ele-body">
     <div className="ele-head">
        <div className="ele-eyebrows"></div>
        <div className="ele-eyes"></div>
        <div className="ele-mouth"></div>
        <div className="ele-fang-front"></div>
        <div className="ele-fang-back"></div>
        <div className="ele-ear"></div>
      </div>
    </div>
    <div className="ele-leg-1 ele-leg-back">
      <div className="ele-foot"></div>
    </div>
    <div className="ele-leg-2 ele-leg-front">
      <div className="ele-foot"></div>
    </div>
    <div className="ele-leg-3 ele-leg-back">
      <div className="ele-foot"></div>
    </div>
    <div className="ele-leg-4 ele-leg-front">
      <div className="ele-foot"></div>
    </div>
  </div>)
 }



 export const questions=[
  {
    question:"If you want to invest Rs. 1 lakh, which lock-in period will you choose? Return is higher in longer lock-in period.",
    options:[
      {op:"Up to two years",num:"0",score:1},
      {op:"Two to three years",num:"1",score:2},
      {op:"Three to five years",num:"2",score:3},
      {op:"Five to ten years",num:"3",score:4},
      {op:"More than ten years",num:"4",score:5}
           ]
  },
  {
    question:"The age group you belong to:",
    options:[
      {op:"Less than 25 years",num:"1",score:4},
      {op:"25-35 years",num:"2",score:3},
      {op:"36-50 years",num:"3",score:2},
      {op:"51 years & above",num:"4",score:1}
            ]
  },
  {
  question:"How well do you understand investing in the markets?",
  options:[
    {op:"I don’t understand the markets at all",num:"1",score:1},
    {op:"I have basic understanding of investing but haven’t invested in anything yet",num:"2",score:2},
    {op:"I have invested earlier on my own. I understand how markets fluctuate and the pros and cons of different investment classes",num:"3",score:3},
    {op:"I am an experienced investor. I have invested in different markets and understand different investment strategies",num:"4",score:4},
          ]
  },
  {
  question:"Your current and future income sources (example: salary, business income, investment income, etc.) are:",
  options:[
    {op:"Very unstable",num:"1",score:1},
    {op:"Unstable",num:"2",score:2},
    {op:"Somewhat stable",num:"3",score:3},
    {op:"Stable",num:"4",score:4},
    {op:"Very stable",num:"5",score:5}
          ]
  },
  {
  question:"How many dependents do you have? (Dependents are people like parents, spouse, children who depend on your income)",
  options:[                
    {op:"0",num:"1",score:5},
    {op:"1-2",num:"2",score:4},
    {op:"3-4",num:"3",score:3},
    {op:"5-6",num:"4",score:2},
    {op:"More than 6",num:"5",score:1},            
          ]
  },
  {
  question:"If you are investing for long‐term (more than 5 years), how long will you hold on to a poorly performing investment before selling it?",
  options:[
    {op:"Sell immediately if there is an erosion of my investment",num:"1",score:1},
    {op:"Hold for 3 months before selling it",num:"2",score:2},
    {op:"Hold for 6 months before selling it",num:"3",score:3},
    {op:"Hold for one year before selling it",num:"4",score:4},
    {op:"Hold for up to two years before selling it",num:"5",score:5},
    {op:"Hold for more than two years",num:"6",score:6},
          ]
  },
  {
  question:"Volatile investments usually provide higher returns and tax efficiency. What is your desired balance?",
  options:[                
    {op:"Preferably guaranteed returns, before tax efficiency",num:"1",score:1},
    {op:"Stable, reliable returns, minimal tax efficiency",num:"2",score:2},
    {op:"Some variability in returns, some tax efficiency",num:"3",score:3},
    {op:"Moderate variability in returns, reasonable tax efficiency",num:"4",score:4},
    {op:"Unstable, but potentially higher returns, maximising tax efficiency",num:"5",score:5},
          ]
  },
  {
  question:"If a few months after investing, the value of your investments declines by 20%, what would you do?",
    options:[
    {op:"Cut losses immediately and sell all investments. Saving investments is paramount",num:"1",score:1},
    {op:"Cut your losses and transfer investments to safer asset classes",num:"2",score:2},
    {op:"You would be worried, but would give your investments a little more time",num:"3",score:3},
    {op:"You are ok with volatility and accept decline in portfolio value as a part of investing. You would keep your investments as they are",num:"4",score:4},
          ]
  },
  {
  question:" What level of potential losses and profits would you be comfortable with?",
  options:[
    {op:"Maximum loss: -1%; Maximum profit: 15%",num:"1",score:1},
    {op:"Maximum loss: -5%; Maximum profit: 20%",num:"2",score:2},
    {op:"Maximum loss: -10%; Maximum profit: 25%",num:"3",score:3},
    {op:"Maximum loss: -14%; Maximum profit: 30%",num:"4",score:4},
    {op:"Maximum loss: -18%; Maximum profit: 35%",num:"5",score:5},
    {op:"Maximum loss: -21%; Maximum profit: 40%",num:"6",score:6},
          ]
  }
        
    ]

const Hdiw=()=>{
  return(
    <img src={`${Howdoesitworks}`} height="400px"/>
  )
}
export const faqs=[{
      summary:"What is BeFinSavvy?",
      details:"BeFinSavvy is a personal finance coach guiding young professionals to manage their finances better."
    },
    {
      summary:"What is BeFinSavvy's mission?",
      details:"Its mission is to help millennials retire early.",
    },{
      summary:"What is the advantage of using a personal finance coach?",
      details:"A personal finance coach develops a personalized comprehensive financial plan for you looking at every aspect of your situation, needs, and preference. This ensures your financial health is strong and you achieve your financial goals at the earliest."
    },{
      summary:"How is BeFinSavvy different?",
      details:"BeFinSavvy is an independent personal finance coach who focuses only on what’s best for you. Generally, the independent financial advisors offering such comprehensive advice serve the HNIs and ultra-rich. BeFinSavvy focuses on young professionals who have recently started their careers and helps them avoid costly money mistakes."
    },
    {
      summary:"What is BeFinSavvy's consultation fee?",
      details:"Fee ranges between ₹ 1,500 and ₹ 5,000 and most of the clients pay between ₹ 2,000 and ₹ 3,000."
    },{
      summary:"Are there any hidden charges?",
      details:"BeFinSavvy charges consultation fees upfront. That is the only charge, there is no hidden charge."
    },{
      summary:"What all services does BeFinSavvy provide?",
      details:"BeFinSavvy offers consultation service that looks at your entire financial situation, needs and preferences and then advice you on how to save taxes, optimise expenses and manage investments so that all of these are aligned with financial goals."
    },{
      summary:"How does it work?",
      details:<Hdiw/>
    },{
      summary:"At what stage of life should I talk to BeFinSavvy?",
      details:"At the earliest. We have had clients who took our service when they were about to join their first job and wanted to know how to manage money, and got greatly benefitted from the service."
    },{
      summary:"My bank relationship manager or CA offers me free advice for making investments. Why should I pay BeFinSavvy?",
      details:"You must have heard that there are no free lunches. If their advice is really free, ask them if you can take their advice and buy whatever product they are proposing online and not through them. If they give you any reason why you should go with them, you should be smart enough to know that they have some interest there."
    },{
      summary:"Do I need to know the basics of finance to talk to you?",
      details:"  Not at all. You can talk to us even if you don’t have any knowledge about finance."
    }
    ]