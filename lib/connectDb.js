const { Client } = require('@notionhq/client');

const notion = new Client({ auth: 'secret_GXIFCePsZ0OCoPlUGeCR524PFrkqNukCvGbC5h7iO03' });

module.exports = async ({ date = '', projectName = '', price = '', thing = '', string = '' }) => {
  return new Promise(async (resolve) => {
    const databaseId = '97c5d45e3436412f9b5c55a35592fba8';
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        日期: {
          type: 'title',
          title: [{
            text: {
              content: date
            }
          }]
        },
        项目: {
          type: 'select',
          select: {
            name: projectName
          }
        },
        金额: {
          type: 'number',
          number: price
        },
        物品: {
          type: 'rich_text',
          rich_text: [
            {
              text: {
                content: thing
              }
            }
          ]
        },
        源字符: {
          type: 'rich_text',
          rich_text: [
            {
              text: {
                content: string
              }
            }
          ]
        }
      },
    });
    resolve(response)
  })
}
