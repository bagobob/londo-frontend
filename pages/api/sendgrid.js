import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
    try {
        // console.log("REQ.BODY", req.body);
        await sendgrid.send({
            to: "services@bazarrafal.com", // Your email where you'll receive emails
            from: "services@bazarrafal.com", // your website email address here
            subject: `${req.body.subject}`,
            html: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html lang="en">
            <head>
              <meta charset="utf-8">
            
              <title>Bazarrafal</title>
              <meta name="description" content="Bazarrafal">
              <meta name="author" content="darecorp">
            <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
            
              <link rel="stylesheet" href="css/styles.css?v=1.0">
            
            </head>
            
            <body>
              <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
                    </div>
                    <div class="container" style="margin-left: 20px;margin-right: 20px;">
                    <h3>You've got a new mail from ${req.body.firstName} ${req.body.lastName}, their email is: ✉️${req.body.email} </h3>
                    <div style="font-size: 16px;">
                    <p>Message:</p>
                    <p>${req.body.message}</p>
                    <br>
                    </div>
                    <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Bazarrafal<br>Darecorp Inc<br>+237 6 56 28 88 38</p>
                    <div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
                      <a href="https://bazarrafal.in/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Website</a>
                      <a href="https://bazarrafal.in/blog/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Blog</a>
                      <a href="https://github.com/bazarrafal/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">GitHub</a>
                      <a href="https://instagram.com/bazarrafal/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Instagram</a>
                      <a href="https://linkedin.com/in/bazarrafal/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">LinkedIn</a>
                      <a href="https://twitter.com/bazarrafal/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Twitter</a>
                      
                    </div>
                    </div>
            </body>
            </html>
            `,
        });
    } catch (error) {
        // console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }

    return res.status(200).json({ error: "" });
}

export default sendEmail;