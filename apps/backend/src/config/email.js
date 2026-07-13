const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

async function sendOtpEmail(to, otp) {
  await transporter.sendMail({
    from: `"KIMHOUSING" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Mã OTP đặt lại mật khẩu',
    html: `
      <p>Mã OTP của bạn là:</p>
      <h2>${otp}</h2>
      <p>Mã có hiệu lực trong 5 phút. Không chia sẻ mã này cho ai khác.</p>
    `,
  });
}

module.exports = { sendOtpEmail };