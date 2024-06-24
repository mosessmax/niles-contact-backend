import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';
import Joi from 'joi';

// Initialize express app
const app = express();
app.use(express.json());
app.use(cors());

// Load environment variables
dotenv.config();

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your preferred service
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

// Updated Joi schema for validation
const formSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    company: Joi.string().required(),
    website: Joi.string().uri().required(),
    product: Joi.string().required(),
    quantity: Joi.number().required(),
    location: Joi.string().required(),
    message: Joi.string().required(),
  });
  
  app.post('/submit-form', async (req, res) => {
    try {
      // 
      await formSchema.validateAsync(req.body);
  
      // destructure validated data
      const { name, email, phone, company, website, product, quantity, location, message } = req.body;
  
      // sennd email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_USER, // Sender address
        to: process.env.EMAIL_USER, // receiver
        subject: "New Form Submission is here!", // Subject line
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px;">
            <h2 style="color: #333;">New Form Submission</h2>
            <div style="padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Company:</strong> ${company}</p>
              <p><strong>Website:</strong> <a href="${website}" style="color: #0066cc;">${website}</a></p>
              <p><strong>Product:</strong> ${product}</p>
              <p><strong>Quantity:</strong> ${quantity}</p>
              <p><strong>Location:</strong> ${location}</p>
              <p><strong>Message:</strong> ${message}</p>
            </div>
            <p style="margin-top: 20px; font-size: 0.9em; color: #666;">This is an automated message. Please do not reply directly to this email.</p>
          </div>
        `,
      });
  

      // Send thank you email to the user
      await transporter.sendMail({
        from: process.env.EMAIL_USER, // 
        to: `${email}`, // the users email from the form
        text: "Thank you, your information has been received.", //
        html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px;">
            <h2 style="color: #333;">Thank you for your submission</h2>
            <p>We have received your information and will get back to you shortly.</p>
            <p style="margin-top: 20px; font-size: 0.9em; color: #666;">This is an automated message. Please do not reply directly to this email.</p>
            </div>
        `
    });

      res.status(200).send('form submitted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Add a route for handling errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});