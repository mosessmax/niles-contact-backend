const express = require('express');
const bodyParser = require('body-parser');
const Notification = require('./services/notification.service');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/submit-form', async (req, res) => {
  try {
    const contact = req.body;

    console.log('Sending emails...');

    // Send both emails concurrently and handle each promise independently
    const adminMailPromise = Notification.sendAdminMail(contact).catch(error => {
      console.error('Error sending admin mail:', error);
      return 'admin_error'; // Return a custom error or identifier
    });

    const userMailPromise = Notification.sendUsersMail(contact).catch(error => {
      console.error('Error sending user mail:', error);
      return 'user_error'; // Return a custom error or identifier
    });

    // Wait for both promises to settle
    const results = await Promise.all([adminMailPromise, userMailPromise]);

    // Check results to see if any of the operations failed
    if (results.includes('user_error')) {
      console.error('Failed to send user email.');
      // Handle specific error scenario here if needed
    }

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'An error occurred while submitting the form' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
