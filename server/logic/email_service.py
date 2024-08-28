import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from dotenv import load_dotenv


class EmailSender:

    def __init__(self):
        env_path = os.path.join(os.path.dirname(__file__), '../.env')
        load_dotenv(dotenv_path=env_path)
        self.server = None
        self.SMTP_SERVER = os.getenv('SMTP_SERVER')
        self.SMTP_PORT = int(os.getenv('SMTP_PORT'))
        self.SMTP_USERNAME = os.getenv('SMTP_USERNAME')
        self.SMTP_PASSWORD = os.getenv('SMTP_PASSWORD')
        self.EMAIL_FROM = os.getenv('EMAIL_FROM')
        self.EMAIL_SUBJECT = os.getenv('EMAIL_SUBJECT')
        self.connect()

    def connect(self):
        if self.server is None:
            try:
                self.server = smtplib.SMTP(self.SMTP_SERVER, self.SMTP_PORT)
                self.server.starttls()
                self.server.login(self.SMTP_USERNAME, self.SMTP_PASSWORD)
            except Exception as e:
                print(f"Failed to connect to the SMTP server: {e}")

    def disconnect(self):
        if self.server:
            self.server.quit()
            self.server = None

    def reconnect(self):
        self.disconnect()
        self.connect()

    def check_connection(self):
        try:
            self.server.noop()
        except (smtplib.SMTPServerDisconnected, smtplib.SMTPResponseException):
            self.reconnect()

    def send_email(self, to_email: str, subject: str, body: str):
        self.check_connection()

        msg = MIMEMultipart()
        msg['From'] = self.EMAIL_FROM
        msg['To'] = to_email
        msg['Subject'] = subject

        msg.attach(MIMEText(body, 'plain'))

        try:
            self.server.send_message(msg)
        except smtplib.SMTPException as e:
            print(f"Error sending email: {e}")
            self.reconnect()
            try:
                self.server.send_message(msg)
            except Exception as e:
                print(f"Failed to resend email: {e}")

    async def send_reset_email(self, email: str, token: str):
        reset_link = f"http://localhost:3000/reset-password?token={token}"
        subject = self.EMAIL_SUBJECT
        body = f"Click the link to reset your password: {reset_link}"
        self.send_email(email, subject, body)

    def __del__(self):
        self.disconnect()
