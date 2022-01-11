export const template = (firstname, pic, inv, levell, desc, desc1) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <style>
        .img {
          text-align: center;
          align-items: center;
        }
  
        p {
          padding-left: 3px;
          padding-top: 5px;
          padding-right: 2px;
        }
  
        .butt {
          font-size: 18px;
          color: white;
          padding: 3px;
          display: block;
          margin: auto;
          text-align: center;
          width: max-content;
          color: white;
          background-color: #4ed0ce;
          border-radius: 1px;
          border: 2px solid white;
          cursor: pointer;
          font-size: 18px
        }
  
        .butt1 {
          font-size: 18px;
          color: white;
          padding: 3px;
          display: block;
          margin: auto;
          text-align: center;
          width: max-content;
          color: white;
          background-color: #238EE7;
          border-radius: 1px;
          border: 2px solid white;
          cursor: pointer;
          font-size: 18px
        }
  
        .last {
          height: 100px;
          font-size: 18px;
          color: white;
          padding: 3px;
          color: white;
          background-color: #4ed0ce;
          border-radius: 1px;
          align-items: center;
          border: 2px solid #234668;
        }
  
        .fle {
          display: flex;
          flex-direction: row;
        }
  
        html {
          margin: 4px;
        }
  
        @media (max-width: 768px) {
          .fle {
            display: block;
          }
  
          .butt {
            font-size: 12px;
          }
  
          .butt1 {
            font-size: 12px;
            color: white;
            padding: 3px;
            display: block;
            margin: auto;
            text-align: center;
            width: max-content;
            color: white;
            background-color: #238EE7;
            border-radius: 1px;
            border: 2px solid white;
            cursor: pointer;
            font-size: 12px
          }
        }
  
        @media (max-width: 1380px) {
          .butt {
            font-size: 18px;
          }
  
          .butt1 {
            font-size: 18px;
            color: white;
            padding: 3px;
            display: block;
            margin: auto;
            text-align: center;
            min-width: max-content;
            width: 100%;
            color: white;
            background-color: #238EE7;
            border-radius: 1px;
            border: 2px solid white;
            cursor: pointer;
            font-size: 18px;
          }
        }
      </style>
    </head>
    <link rel="stylesheet" href="https://pro.fontawesome.com/
            releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3Zcu
            HtOA93w35dYTsvhLPVnYs9eStHfGJvOvKx
            VfELGroGkvsg+p" crossorigin="anonymous" />
    <p style="color:#4ed0ce;
            font-weight:bold;font-size:22px;
            text-align:center">Hi ${firstname},</p>
    <div class="img">
      <img src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/congele.png" width="50%"
        style="display:block;margin-left:auto;margin-right:auto">
      <p style="font-size:18px;
            text-align:center;
            font-weight:bold;color:black">You
        checked your risk profile on <a href="http://www.befinsavvy.com/">www.befinsavvy.com</a></p>
      <p style="color:#4ed0ce;
            font-weight:bold;font-size:22px;         text-align:center">Congratulations on being conscious of your
        financial knowledge!</p>
      <p style="color:black;font-size:18px;text-align:center">Understanding your level of financial knowledge is critical
        for making sound financial decisions. And knowing the result can help you decide whether you can manage your own
        finances or whether you need support to help you make sound financial decisions.
      </p>
      <p style="color:#4ed0ce;font-size:22px;text-align:center">
        And, don’t worry, if you feel lost… Trust us, you’re not alone!
      </p>
      <p style="font-size:18px;text-align:center;color:black">
        Based on your answers, it seems like you have a ${levell} level of financial knowledge.</p>
      <img src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/${pic}.png" width="30%"
        style="display:block;margin-left:auto;margin-right:auto">
      <p style="color: #4ed0ce;font-weight:bold;font-size:22px;text-align:center">YOU'RE at<br /> ${inv} level</p>
      <p style="font-size:18px;text-align:center;color:black">${desc}
      </p>
      <p style="font-size:18px;text-align:center;font-weight:bold;color:black">${desc1}
      </p>
    </div>
    <p style="color: #4ed0ce;font-weight:bold;font-size:22px;text-align:center">
      Checked your Finance lieteray but still feeling lost?
      <br /><span style="color: #4ed0ce;font-weight:bold;font-size:22px;text-align:center">Don't worry, we got you!</span>
    </p>
    <p style="font-size:18px;text-align:center;color:black">
      We are surrounded by financial decisions - how to save taxes, how to budget, which bank account and credit card to
      use, which loan to take and whether to prepay it or not, where to invest our savings, and how to plan for our future
      needs.<br />
      Taking these decisions can be complicated or overwhelming but it’s a life skill that can be learned! However, even for
      the most experienced financial planners, a little bit of support and guidance goes a long way to avoid costly mistakes
      both in terms of lost time and lost money.
    </p>
    <p style="color: #4ed0ce;font-weight:bold;font-size:22px;text-align:center">
      Here are some ways in which BeFinSavvy can support you:
    </p>
    <div class="fle">
      <div style="padding-left:2px;padding-bottom:22px">
        <img src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/1.JPG" height="100px"
          style="display:block;margin-left:auto;margin-right:auto">
        <p style="font-size:18px;text-align:center;font-weight:bold;color:black">PERSONAL<br></br> CONSULTATIONS</p>
        <p style="font-size:18px;text-align:justify;padding-right:10px;padding-left:10px;color:black;min-height:120px">For
          singles and couple, who want to identify their financial goals and create a personalised plan to reach them faster
        </p>
        <a href="https://meetings.hubspot.com/befinsavvy"
          style="background-color:#4ed0ce;color:white;padding-top:6px;padding-bottom:6px;padding-left:24px;padding-right:24px;border-radius:60px"
          class="butt"><b>TALK TO US</b></a>
      </div>
      <div style="padding-left:2px;padding-bottom:22px">
        <img src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/2.JPG" height="100px"
          style="display:block;margin-left:auto;margin-right:auto">
        <p style="font-size:18px;text-align:center;font-weight:bold;color:black">CORPORATE <br></br> TRAININGS
        </p>
        <p style="font-size:18px;text-align:justify;padding-right:10px;padding-left:10px;color:black;min-height:120px">FREE
          for small and medium size orgnizations on specific topics like personal finance management, tax planning etc</p>
        <a href="https://meetings.hubspot.com/befinsavvy" style="background-color:#4ed0ce;
              color:white;padding-top:6px;
              padding-bottom:6px;
              padding-left:24px;
              padding-right:24px;
              border-radius:60px" class="butt"><b> REQUEST INFO</ b></a>
      </div>
      <div style="padding-left:2px;padding-bottom:22px">
        <img src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/3.JPG" height="100px"
          style="display:block;margin-left:auto;margin-right:auto">
        <p style="font-size:18px;text-align:center;font-weight:bold;color:black">ONLINE <br></br> WORKSHOPS</p>
        <p style="font-size:18px;text-align:justify;padding-right:10px;padding-left:10px;color:black;min-height:120px">
          Providing a step-by-step approach to managing finance & investments. Interactive online sessions taking place at
          regular intervals</p>
        <a href="https://meetings.hubspot.com/befinsavvy" style="background-color:#4ed0ce;
              color:white;padding-top:6px;
              padding-bottom:6px;
              padding-left:24px;
              padding-right:24px;
              border-radius:60px" class="butt"><b>SEE ALL EVENTS</ b></a>
      </div>
    </div>
    <p style="color: #4ed0ce;text-align:center;font-size:18px;padding-top:5px">
      <span style="font-weight:bold">About BeFinSavvy</span>
      <br />
      <span style="text-align:center;font-size:18;color:black">
        BeFinSavvy helps young professionals learn and manage their personal finances. We offer consultations on saving
        taxes, optimising expenses, and managing investments.
      </span>
    </p>
    <div style="background-color:#238EE7;color:white;padding-top:30px;padding-bottom:30px;padding-left:10px;width:100%"
      class="butt1">
      <p style="text-align:center; font-size:22px">Follow us on social media
        <a href="https://www.facebook.com/Befinsavvynow" style="padding-left:10px;
            padding-top:5px"><img
            src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/facebookIcon.png"
            width="30px" /></a>
        <a href="https://www.instagram.com/befinsavvynow/" style="padding-left:10px;padding-top:5px"><img
            src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/instagramIcon.png"
            width="30px" /></a>
        <a href="https://www.linkedin.com/company/befinsavvy/" style="padding-left:10px;padding-top:5px"><img
            src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/linkedInIcon.png"
            width="30px" /></a><a
          href="https://wa.me/917704047770?text=Hi%20BeFinSavvy,%20Can%20you%20please%20call%20me%20back?%20"
          style="padding-left:10px;padding-top:5px"><img
            src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/WAicon.png"
            width="30px" /></a>
      </p>
    </div>
    </div>
    </html>
  `;

  return html;
}