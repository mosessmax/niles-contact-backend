// const app = require('./config/express');

// const p = app.get('port'),
// cb = _ => console.log(`Server running on port ${p}`);

// app.listen(p, cb)


// v2 
// import express from 'express';

// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello World!');
//     }
// );  

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
//     }
// );

// Import necessary modules
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
        to: "info@terrahaptix.com", // reciever
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
