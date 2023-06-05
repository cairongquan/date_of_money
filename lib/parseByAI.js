const { Configuration, OpenAIApi } = require("openai");
const request = require("request");
const dotenv = require("dotenv");
const path = require("path");
const { OpenAiKey, ProxyAddress } = dotenv.config({
  path: path.join(__dirname, "../config.env"),
}).parsed;
const requestUrl = "https://api.openai.com/v1/chat/completions";
module.exports = (content) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: requestUrl,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OpenAiKey}`,
        },
        proxy: ProxyAddress,
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content:
                `"${content}"` +
                ",根据这句话返回一个JSON对象{pay:付了多少钱,数字类型,item:买了什么或者干了什么,把具体事物提出来},不要说多余的话",
            },
          ],
          temperature: 0.7,
        }),
      },
      (err, data) => {
        if (err) return reject(err);
        try {
          resolve({
            data: JSON.parse(data.body).choices[0],
            code: 1,
          });
        } catch {
          resolve({ data: null, code: 0 });
        }
      }
    );
  });
};
