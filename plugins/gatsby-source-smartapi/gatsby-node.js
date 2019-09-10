const axios = require("axios")
const createNodeHelpers = require("gatsby-node-helpers").default
const client = require('smartsheet');
const smartsheet = client.createClient({
    accessToken: '81fxz87aw92fx3czom2lsa02kj'
  });

exports.sourceNodes = async ({ actions }) => {

    const { createNode } = actions
    const { createNodeFactory } = createNodeHelpers({
        typePrefix: 'Smartsheet'
    })

    const prepareSheets = createNodeFactory("Sheets");

    const options = {
        queryParameters: {
          include: "attachments",
          includeAll: true
        }
      };
       
      // List all sheets
    const sheets = await smartsheet.sheets.listSheets(options)
    console.log(sheets.data);
    // .then(function (result) {
    //     console.log(result.data);
    //     result.data.forEach(sheet => createNode(prepareSheets(sheet)) )
        
    //     // var sheetId = result.data[0].id;                // Choose the first sheet
    
    //     // Load one sheet
    //     // smartsheet.sheets.getSheet({id: sheetId})
    //     // .then(function(sheetInfo) {
    //     //     console.log(sheetInfo);
    //     // })
    //     // .catch(function(error) {
    //     //     console.log(error);
    //     // });
    // })
    // .catch(function(error) {
    //     console.log(error);
    // });
    sheets.data.forEach(sheet => createNode(prepareSheets(sheet)) )
}

