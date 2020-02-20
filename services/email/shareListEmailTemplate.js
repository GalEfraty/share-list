const keys = require("../../config/keys");

module.exports = (fullNameFrom, listLink) => {
  const template = `
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body>
            <div>
                Hello, your friend ${fullNameFrom} invites you to join a list,
                to join the list, click here: ${listLink}
                -share-list-♥
            </div>
        </body>
    </html>`;
  return template;
};
