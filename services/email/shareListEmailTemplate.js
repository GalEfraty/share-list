module.exports = (fullNameFrom, listLink, listName) => {
  const template = `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <title>Share List Invitation</title>
      <style>
          * {
              direction: ltr;
              box-sizing: border-box;
              margin: auto;
              font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
          }

          body {
              background-color: #e5e5e5;
          }

          .headers_link_icon {
              margin-right: 10px;
              background-color: inherit;
          }

          .header-wrapper {
              height: 8%;
              font-size: 1.5rem;
              padding: 5px;
              background-color: #1089ff;
          }

          .header-link {
              color: white;
              margin-left: 2%;
              background-color: #1089ff;
              padding-top: 0.5%;
              text-decoration: none;
          }

          .header-link:hover {
              color: #eeeeee;
          }

          .header-brand {
              background-color: #1089ff;
              text-decoration: none;
          }

          .email-wrapper {
              padding-top: 3%;
              padding-bottom: 4%;
              display: flex;
              justify-content: center;
              background-color: #e5e5e5;
          }

          .subscribe-btn {
              margin-top: 3%;
              display: inline-block;
              border-radius: 5px;
              border: 2px #1089ff solid;
              color: #FFFFFF;
              background-color: #23374d;
              padding: 2%;
              font-size: 1.3rem;
              text-decoration: none;
              text-align: center;
          }

          .name-span {
              font-size: 1.1rem;
              color: #1089ff;
          }

          .mail-text {
              margin-right: 7%;
              margin-left: 7%;
          }
          a:hover, a{
            text-decoration: none;
            color: #FFFFFF!important;
          }
          .ii a[href]{
            color: #FFFFFF!important;
          }
      </style>
    </head>

    <body>
        <div class="header-wrapper">
            <a class="header-link" href="https://gal-share-list.herokuapp.com">
                <span className="header-brand"> Share List</span>
            </a>
        </div>
        <div class="email-wrapper">
            <div class="mail-text">
                <p>Hi,</p>
                your friend <span class="name-span">${fullNameFrom}</span> invited you to join his list
                <span class="name-span">${listName}</span>.
                <br>
                <a href="${listLink}" class="subscribe-btn">click here to subscribe</a>
            </div>
        </div>
    </body>

    </html>
    `;
  return template;
};
