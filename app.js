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
  
      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER, // Sender address
        to: "", // reciever
        subject: "New Form Submission", // Subject line
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nWebsite: ${website}\nProduct: ${product}\nQuantity: ${quantity}\nLocation: ${location}\nMessage: ${message}`, 
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