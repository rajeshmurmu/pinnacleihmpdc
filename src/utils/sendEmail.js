import nodemailer from "nodemailer";

const sendEmail = async (to_user, subject, message) => {
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
    to: to_user,
    // subject: "Email Verification Message",
    subject: subject,
    // text: "This is a test message for verfiy email",
    // html: "<p>HTML version of the message</p>",
    html: `<p>${message}</p>`,
  };

  try {
    const emailResponse = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return emailResponse;
  } catch (error) {
    console.log(`Error While sending vefication Email`, error);
  }
};

export default sendEmail;
