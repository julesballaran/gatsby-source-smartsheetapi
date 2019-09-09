require('dotenv').config()
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-smartapi',
      options: {
        sheetId: '3940651537590148',
        tokken: process.env.TOKKEN
      }
    }
  ]
}
