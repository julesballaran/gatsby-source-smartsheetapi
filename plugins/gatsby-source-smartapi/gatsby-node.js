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
    const {data:listSheets} = await smartsheet.sheets.listSheets(options)
    const getSheetsData = (listSheets) => 
        Promise.all(
            listSheets.map( async sheet => {
                const sheetData = await smartsheet.sheets.getSheet({id: sheet.id})        
                return sheetData

            })
        );
    
    const sheets = await getSheetsData(listSheets)
    sheets.forEach(sheet => createNode(prepareSheets(sheet)))
}

