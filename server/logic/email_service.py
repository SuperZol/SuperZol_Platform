import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class EmailSender:
    SMTP_SERVER = 'smtp.gmail.com'
    SMTP_PORT = 587
    SMTP_USERNAME = ''
    SMTP_PASSWORD = ''
    EMAIL_FROM = ''
    EMAIL_SUBJECT = 'Password Reset Request'

    def __init__(self):
        self.server = smtplib.SMTP(self.SMTP_SERVER, self.SMTP_PORT)
        self.server.starttls()
        self.server.login(self.SMTP_USERNAME, self.SMTP_PASSWORD)

    def __del__(self):
        self.server.quit()

    def send_email(self, to_email: str, subject: str, body: str):
        msg = MIMEMultipart()
        msg['From'] = self.EMAIL_FROM
        msg['To'] = to_email
        msg['Subject'] = subject

        msg.attach(MIMEText(body, 'plain'))

        self.server.send_message(msg)

    async def send_reset_email(self, email: str, token: str):
        reset_link = f"http://localhost:3000/reset-password?token={token}"
        subject = self.EMAIL_SUBJECT
        body = f"Click the link to reset your password: {reset_link}"
        self.send_email(email, subject, body)
