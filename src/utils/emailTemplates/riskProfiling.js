export const template = (firstname, pic, inv, inv1, desc, desc1) => {
  const html = `
          <html style="color:black">
          <head>
          <style>
        
            .img{
              text-align: center;
              align-items: center;
            }
            p{
              padding-left: 3px;
              padding-top: 5px;
              padding-right: 2px;
            }
            .butt{
              font-size: 18px;
              color:white;
              padding:3px;
              display:block;
              margin:auto;
              text-align:center;
              width:max-content;
              color: white;
              background-color:#4ed0ce;
              border-radius: 1px;
              border: 2px solid white;
              cursor: pointer;
              font-size:18px
            }
            .butt1{
              font-size: 18px;
              color:white;
              padding:3px;
              display:block;
              margin:auto;
              text-align:center;
              width:max-content;
              color: white;
              background-color:#238EE7;
              border-radius: 1px;
              border: 2px solid white;
              cursor: pointer;
              font-size:18px
            }
            .last{
              height: 100px;
              font-size: 18px;
              color:white;
              padding:3px;
              color: white;
              background-color:#4ed0ce;
              border-radius: 1px;
              align-items: center;
              border: 2px solid #234668;
            }
            .fle{
              display:flex;
              flex-direction:row;
            }
            html{
              margin: 4px;
            }
            @media (max-width: 768px) {
            .fle{
              display: block;
            }
            .butt{
              font-size:12px;
            }
            .butt1{
              font-size: 12px;
              color:white;
              padding:3px;
              display:block;
              margin:auto;
              text-align:center;
              width:max-content;
              color: white;
              background-color:#238EE7;
              border-radius: 1px;
              border: 2px solid white;
              cursor: pointer;
              font-size:12px
            }
            }
            @media (max-width: 1380px) {
              .butt{
                font-size:18px;
              }
              .butt1{
                font-size: 18px;
                color:white;
                padding:3px;
                display:block;
                margin:auto;
                text-align:center;
                min-width:max-content;
                width:100%;
                color: white;
                background-color:#238EE7;
                border-radius: 1px;
                border: 2px solid white;
                cursor: pointer;
                font-size:18px;
              }
              }
          </style>
          </head>
          <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
          <p style="color:#4ed0ce;font-weight:bold;font-size:22px;text-align:center">Hi ${firstname},</p>
          <div class="img">
          <img src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/congele.png" width="50%" style="display:block;margin-left:auto;margin-right:auto">
          <p style="font-size:18px;text-align:center;font-weight:bold;color:black">You checked your risk profile on <a href="http://www.befinsavvy.com/">www.befinsavvy.com</a></p>
          <p style="color:#4ed0ce;font-weight:bold;font-size:22px;text-align:center;">Understanding your risk profile is extremely important before you start planning your investments.</p>
          <p style="font-size:18px;text-align:center;color:black">
            After knowing your risk profile, you have a much better understanding of which type of assets to invest in and how to allocate your funds across various asset classes or types.
          </p>
          <img src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/${pic}.png" width="30%" style="display:block;margin-left:auto;margin-right:auto">
          <p style="color:#4ed0ce;font-weight:bold;font-size:22px;text-align:center">YOU'RE ${inv}<br/>${inv1}</p>
          <i style="font-size:18px;text-align:center;color:black">"Successful investing is about managing risk,<br/> not avoiding it" - Benjamin Graham</i>
          </div>
          <p style="font-size:18px;text-align:center;color:black"><span style="font-weight:bold">${desc}</span>${desc1}
          </p>
          <p style="color: #4ed0ce;font-weight:bold;font-size:22px;text-align:center">
          Checked your risk profile but still feeling lost?<br/>
          <span style="color: #4ed0ce;font-weight:bold;font-size:22px;text-align:center">Don't worry, we got you!
          </span></p>
          <p style="font-size:18px;text-align:center;color:black">
          While understanding risk can be complex, it is absolutely manageable. A little bit of support and guidance goes a long way and helps you avoid costly mistakes both in terms of lost time and lost money.
          </p>
          <p style="color: #4ed0ce;font-weight:bold;font-size:22px;text-align:center">
          Here are some ways in which BeFinSavvy can support you:
          </p>
        <div class="fle">
          <div style="padding-left:4px;padding-bottom:22px;color:black">
            <img src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/1.JPG" height="100px" style="display:block;margin-left:auto;margin-right:auto">
            <p style="font-size:18px;text-align:center;font-weight:bold">PERSONAL<br></br> CONSULTATIONS</p>
            <p style="font-size:18px;text-align:left;padding-right:10px;padding-left:10px;min-height:120px">For singles and couple, who want to identify their financial goals and create a personalised plan to reach them faster</p>
            <a href="https://meetings.hubspot.com/befinsavvy" style="background-color:#4ed0ce;color:white;padding-top:6px;padding-bottom:6px;padding-left:24px;padding-right:24px;border-radius:60px" class="butt"><b>TALK TO US</b></a>
          </div>
          <div  style="padding-left:4px;padding-bottom:22px;color:black">
            <img src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/2.JPG" height="100px" style="display:block;margin-left:auto;margin-right:auto">
            <p style="font-size:18px;text-align:center;font-weight:bold">CORPORATE <br></br> TRAININGS
            </p>
            <p style="font-size:18px;text-align:left;padding-right:10px;padding-left:10px;min-height:120px">FREE for small and medium size orgnizations on specific topics like personal finance management, tax planning etc</p>
            <a href="https://meetings.hubspot.com/befinsavvy" style="background-color:#4ed0ce;color:white;padding-top:6px;padding-bottom:6px;
            padding-left:24px;padding-right:24px;border-radius:60px" class="butt"><b> REQUEST INFO</b></a>
          </div>
          <div  style="padding-left:4px;padding-bottom:22px;color:black">
            <img src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/3.JPG" height="100px" style="display:block;margin-left:auto;margin-right:auto">
            <p style="font-size:18px;text-align:center;font-weight:bold">ONLINE <br></br> WORKSHOPS</p>
            <p style="font-size:18px;text-align:left;padding-right:10px;padding-left:10px;min-height:120px">Providing a step-by-step approach to managing finance & investments. Interactive online sessions taking place at regular intervals</p>
            <a href="https://meetings.hubspot.com/befinsavvy" style="background-color:#4ed0ce;color:white;padding-top:6px;padding-bottom:6px;
            padding-left:24px;padding-right:24px;border-radius:60px" class="butt"><b>SEE ALL EVENTS</b></a>
          </div>
        </div>
          <p style="color:#4ed0ce;text-align:center;font-size:18px;padding-top:5px">
          <span 
          style="font-weight:bold">About 
          BeFinSavvy</span>
          <br/>
          <span style="text-align:center;font-size:18px;color:black">
          BeFinSavvy helps young professionals learn and manage their personal finances. We offer consultations on saving taxes, optimising expenses, and managing investments.
          </span></p>
          <div style="background-color:#238EE7;color:white;padding-top:30px;padding-bottom:30px;padding-left:10px;width:100%" class="butt1">
          <p style="text-align:center; font-size:22px">Connect with us on social media
          <a href="https://www.facebook.com/Befinsavvynow" style="padding-left:10px;padding-top:5px"><img src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/facebookIcon.png" width="30px" /></a>
          <a href="https://www.instagram.com/befinsavvynow/" style="padding-left:10px;padding-top:5px"><img src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/instagramIcon.png" width="30px" /></a>
          <a href="https://www.linkedin.com/company/befinsavvy/" style="padding-left:10px;padding-top:5px"><img src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/linkedInIcon.png" width="30px" /></a>
          <a href="https://wa.me/917704047770?text=Hi%20BeFinSavvy,%20Can%20you%20please%20call%20me%20back?%20" style="padding-left:10px;
          padding-top:5px"><img src="https://raw.githubusercontent.com/ravindra579/library-management-system/master/WAicon.png" width="30px" /></a>
          </p></div>
          </div>
        </html>
          `;
  return html
}
