const OAuth2 = require('oauth2').OAuth2
require('dotenv').config()

module.exports = {
  const oauth2 = new OAuth2(process.env.FB_APP_ID,
                          process.env.FB_APP_SECRET,
                         "", "https://www.facebook.com/dialog/oauth",
                     "https://graph.facebook.com/oauth/access_token",
                     null)
}
