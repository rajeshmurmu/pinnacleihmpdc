import nodemailer from "nodemailer";

const sendVerificationEmail = async (
  userEmail,
  subject,
  user,
  verificationCode
) => {
  // creating transporter (SMPT simple mail tranfer protocol)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    host: "smpt.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // configure email content
  const mailOptions = {
    from: `"PINNACLE DEGREE COLLEGE" , ${process.env.EMAIL}<`,
    to: userEmail,
    // subject: "Email Verification Message",
    subject: subject,
    // text: "This is a test message for verfiy email",
    // html: "<p>HTML version of the message</p>",
    html: `
    <div>
    <h2>Hello ${user.firstName}</h2>
    <p>This is Email Verification Message From pinnacleihm by rajesh murmu  <a href="http://localhost:3000/verifyemail">click here</a> to verify your email</p>
    <br>
    <h3>Your Email verification Code : ${verificationCode}</h3>
    
    </div>`,
  };

  // http://localhost:3000/users/verify/rajeshson/123456
  // &nbsp; space character

  try {
    const emailResponse = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return emailResponse;
  } catch (error) {
    console.log(`Error While sending vefication Email`, error);
  }
};

export default sendVerificationEmail;
