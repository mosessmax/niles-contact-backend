if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const defaultConfig = {
  "smtp_secret": process.env.MAIL_SECRET,
  "smtp_user": process.env.SMTP_USER,
  "smtp_from": process.env.FROM_EMAIL,
  "smtp_host": process.env.SMTP_HOST,
  "smtp_reply_to": process.env.SMTP_REPLY_TO
};

const environments = {
  development: {
    ...defaultConfig,
    "app_name": 'Contact Me',
    "port": process.env.PORT || 3002,
  },
  production: {
    ...defaultConfig,
    "port": process.env.PORT || 3002,
  }
};

module.exports = environments[process.env.NODE_ENV || 'development'];