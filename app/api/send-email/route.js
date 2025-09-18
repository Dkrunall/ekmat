import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { formData, paymentDetails } = await request.json();
    
    if (!formData || !formData.fullName || !formData.email) {
      return NextResponse.json(
        { error: 'Missing required form data' },
        { status: 400 }
      );
    }

    // Configure email transporter (you'll need to set up email credentials)
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content for the applicant
    const applicantEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff6b00;">Teacher Application Received</h2>
        <p>Dear ${formData.fullName},</p>
        <p>Thank you for applying for the Teacher position at Ekmat Gyan Jyoti. We have received your application along with the payment confirmation.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Application Details:</h3>
          <p><strong>Name:</strong> ${formData.fullName}</p>
          <p><strong>Father's Name:</strong> ${formData.fatherName}</p>
          <p><strong>Mother's Name:</strong> ${formData.motherName}</p>
          <p><strong>Date of Birth:</strong> ${formData.dob}</p>
          <p><strong>Age:</strong> ${formData.age}</p>
          <p><strong>Gender:</strong> ${formData.gender}</p>
          <p><strong>Category:</strong> ${formData.category}</p>
          <p><strong>Marital Status:</strong> ${formData.maritalStatus}</p>
          <p><strong>Nationality:</strong> ${formData.nationality}</p>
          <p><strong>Aadhaar Number:</strong> ${formData.aadhaar}</p>
        </div>
        
        ${paymentDetails ? `
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Payment Details:</h3>
          <p><strong>Amount Paid:</strong> ₹150</p>
          <p><strong>Transaction ID:</strong> ${paymentDetails.transactionId}</p>
          <p><strong>Order ID:</strong> ${paymentDetails.merchantOrderId}</p>
          <p><strong>Status:</strong> Completed</p>
        </div>
        ` : ''}
        
        <div style="background-color: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Next Steps:</h3>
          <ul>
            <li>Written Examination: 05/10/2025 (Online Mode)</li>
            <li>Merit List will be published based on exam results</li>
            <li>Document verification for selected candidates</li>
            <li>Final selection and appointment</li>
          </ul>
        </div>
        
        <p>We will contact you with further details about the examination process.</p>
        <p>Best regards,<br>Ekmat Gyan Jyoti Team</p>
      </div>
    `;

    // Email content for admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff6b00;">New Teacher Application Received</h2>
        <p>A new teacher application has been submitted with payment confirmation.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Applicant Details:</h3>
          <p><strong>Name:</strong> ${formData.fullName}</p>
          <p><strong>Email:</strong> ${formData.email || 'Not provided'}</p>
          <p><strong>Father's Name:</strong> ${formData.fatherName}</p>
          <p><strong>Mother's Name:</strong> ${formData.motherName}</p>
          <p><strong>Date of Birth:</strong> ${formData.dob}</p>
          <p><strong>Age:</strong> ${formData.age}</p>
          <p><strong>Gender:</strong> ${formData.gender}</p>
          <p><strong>Category:</strong> ${formData.category}</p>
          <p><strong>Marital Status:</strong> ${formData.maritalStatus}</p>
          <p><strong>Nationality:</strong> ${formData.nationality}</p>
          <p><strong>Aadhaar Number:</strong> ${formData.aadhaar}</p>
        </div>
        
        ${paymentDetails ? `
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Payment Details:</h3>
          <p><strong>Amount:</strong> ₹150</p>
          <p><strong>Transaction ID:</strong> ${paymentDetails.transactionId}</p>
          <p><strong>Order ID:</strong> ${paymentDetails.merchantOrderId}</p>
          <p><strong>Payment Status:</strong> Completed</p>
        </div>
        ` : ''}
        
        <p>Please review the application and add to the candidate database.</p>
      </div>
    `;

    // Send email to applicant
    if (formData.email) {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@ekmatgyanjyoti.com',
        to: formData.email,
        subject: 'Teacher Application Received - Ekmat Gyan Jyoti',
        html: applicantEmailHtml,
      });
    }

    // Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@ekmatgyanjyoti.com';
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@ekmatgyanjyoti.com',
      to: adminEmail,
      subject: `New Teacher Application: ${formData.fullName}`,
      html: adminEmailHtml,
    });

    console.log('Emails sent successfully for:', formData.fullName);
    
    return NextResponse.json({
      success: true,
      message: 'Emails sent successfully'
    });

  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { error: 'Failed to send emails', message: error.message },
      { status: 500 }
    );
  }
}