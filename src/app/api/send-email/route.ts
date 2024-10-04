import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';


export async function POST(request: NextRequest) {

  const { firstName, lastName, contactNumber, email } = await request.json();


  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
          user: '7d0463002@smtp-brevo.com',
          pass: 'Y5FKw8mb6z4EXPIB'
      }
  });
     

    const mailOptions = {
      from: `himanshudhoot0805@gmail.com`,
      to: 'sinoj13435@rowplant.com',
      subject: 'New Car Rental Form Submission',
      text: `
        You have a new car rental request:
        First Name: ${firstName}
        Last Name: ${lastName}
        Contact Number: ${contactNumber}
        Email: ${email}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email', error });
  }
  
}
