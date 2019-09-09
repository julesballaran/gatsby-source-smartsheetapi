const axios = require("axios")
const createNodeHelpers = require("gatsby-node-helpers").default

exports.sourceNodes = async ({ actions }, configOptions) => {
    const { sheetId, tokken } = configOptions
    const { createNode } = actions
    const { createNodeFactory } = createNodeHelpers({
        typePrefix: 'Smartsheet'
    })

    const prepareSheets = createNodeFactory("Sheets");

    const { data } = await axios.get(`https://api.smartsheet.com/2.0/sheets/${sheetId}`, {
        headers: {
            'Authorization': `Bearer ${tokken}`
        }
    });
    createNode(prepareSheets(data))
}

