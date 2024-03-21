<div align="center">
   <a href="https://mailtarget.co">
      <img width="400px" src="https://raw.githubusercontent.com/novando-mtarget/mailtarget-nodejs-sdk/master/assets/mailtarget.png" />
   </a>
   <br><br>
</div>

# Mailtarget NodeJs SDK

The Mailtarget NodeJs SDK enable NodeJs developer to work with Mailtarget API efficiently.

## Getting Started

### Installation
To install the SDK to your project, you could get the package from NPM via following command.
```sh
# NPM
npm install @mailtarget/nodejs-sdk

# Yarn
yarn add @mailtarget/nodejs-sdk

# PNPM
pnpm add @mailtarget/nodejs-sdk
```

### Authentication
You have to create a [mailtarget](https://app.mailtarget.co/signup?ref=65e6cf4d63d7ae0008b3e4eb) account to get an API Key.
To manage your API Key navigate to the page by clicking ***Configuration*** on the navbar in the mailtarget dashboard
and then select API Key.

## Setup Client

### Basic Usage
```js
const { Layang } = require('@mailtarget/nodejs-sdk');

const sender = { email: 'usename@yourdomain.com', name: 'John Doe' };
const subject = 'mailtarget Email Test';
const bodyHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Layang</title>
    </head>
    <body style="font-family: "Roboto", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif">
      <h1>Hello World!!!</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <br/><br/>
      <p style="color: #8A8A8A">powered by <a target="_blank" href="https://mailtarget.co" style="color: #8A8A8A">mailtarget</a></p>
    </body>
    </html>
`;
const to = [
  { email: 'janedoe@recipient-domain.com', name: 'Jane Doe' },
];

const sendMail = async () => {
  const mailtarget = new Layang('mailtarget-api-key', sender);
  const transmissionId = await mailtarget.sendMessage(subject, to, bodyHtml);
  if (transmissionId) {
    console.log('Email sent, ID = ', transmissionId);
  } else {
    console.error(mailtarget.getErrorMessage());
  }
};

sendMail();
```

### Using Email Template
If you already using mailtarget Template Creator,
you could use that template to send an email by invoking `sendMessageTempalate` function and pass the `templateId` as a parameter.
Here is an example :
```js
const { Layang } = require('@mailtarget/nodejs-sdk');

const sender = { email: 'usename@yourdomain.com', name: 'John Doe' };
const subject = 'mailtarget Email Test';
const templateId = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
const to = [
  { email: 'janedoe@recipient-domain.com', name: 'Jane Doe' },
];

const sendMail = async () => {
  const mailtarget = new Layang('mailtarget-api-key', sender);
  const transmissionId = await mailtarget.sendMessageTemplate(subject, to, templateId);
  if (transmissionId) {
    console.log('Email sent, ID = ', transmissionId);
  } else {
    console.error(mailtarget.getErrorMessage());
  }
};

sendMail();
```

If you are need to substitute a text using a data you provided
(of course you need to set the template accordingly in mailtarget),
you could declare it as the fourth parameter of `sendMessageTemplate` :
```js
...
const substituteData = { lastname: 'Doe', birthdat: '1 January 1975' };
await mailtarget.sendMessageTemplate(subject, to, templateId, substituteData);
...
```

## Optional Configuration
Here is a list of configuration you could make on your email
(just make sure you declare it before `sendMessag` or `sendMessageTemplate` invocation) :

### Carbon Copy (CC)
```js
const cc = [
  { email: 'usename@yourdomain.com', name: 'John Doe' }
];
mailtarget.cc = cc;
```

### Blind Carbon Copy (BCC)
```js
const bcc = [
  { email: 'usename@yourdomain.com', name: 'John Doe' }
];
mailtarget.bcc = bcc;
```

### Body Text
```js
mailtarget.bodyText = 'Your text went here';
```

### Headers
```js
const headers = [
  { name: 'x-header', value: 'your header value' }
];
mailtarget.headers = headers;
```

### Attachment
```js
const attachment = [
  { mimeType: 'application/octet-stream', filename: 'your_file.pdf', value: 'some-value' }
];
mailtarget.attachment = attachment;
```

### Metadata
```js
const metadata = [
  { metaKey: 'meta-value' }
];
mailtarget.metadata = metadata;
```

### Click Tracking
Track a click activity of an email you sent, default set to active. If you prefer it to be disabled, use following line :
```js
mailtarget.setClickTracking(false);
```

### Open Tracking
Track an open activity of an email you sent, default set to active. If you prefer it to be disabled, use following line :
```js
mailtarget.setOpenTracking(false);
```

### Transactional
Treat the email as transactional, default set to active. If you prefer it to be disabled (i.e you want to send a newsletter which has unsubscribe link on it), use following line :
```js
mailtarget.setTransactional(false);
```
