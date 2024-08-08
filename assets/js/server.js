const express = require('express');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Defina sua chave de API no arquivo .env

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const msg = {
        to: 'gssj9264@gmail.com', // Seu e-mail
        from: email, // E-mail do remetente
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Corpo do e-mail
    };

    sgMail.send(msg)
        .then(() => {
            res.status(200).send('Email sent successfully');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error sending email');
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
