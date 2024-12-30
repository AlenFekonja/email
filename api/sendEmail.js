// api/sendEmail.js
import sgMail from '@sendgrid/mail';

// Set your SendGrid API key (Store it in an environment variable for security)
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, subject, text, html } = req.body;

    // Construct the email object
    const msg = {
      to,  // recipient's email address
      from: 'alen.fek.sola@gmail.com',  // your verified sender email from SendGrid
      subject,
      text,
      html,
    };

    try {
      // Send the email
      await sgMail.send(msg);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
