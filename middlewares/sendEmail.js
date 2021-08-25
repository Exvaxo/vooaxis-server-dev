const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const appConfig = require("../config/appConfig");

module.exports = async (mail) => {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      appConfig.oauthClientId,
      appConfig.oauthClientSecret,
      appConfig.oauthRedirectUri
    );

    oAuth2Client.setCredentials({
      refresh_token: appConfig.oauthRefreshToken,
    });

    const accessToken = await oAuth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "thuvaraganuidesigns@gmail.com",
        clientId: appConfig.oauthClientId,
        clientSecret: appConfig.oauthClientSecret,
        refreshToken: appConfig.oauthRefreshToken,
        accessToken,
      },
    });

    await transporter.sendMail(mail);
  } catch (error) {
    console.log(error);
  }
};
