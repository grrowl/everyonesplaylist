import React from 'react';

export default function clientDocument(props) {
  return (
    <html>
    <head>
      <title>Spotify (umbrella)</title>
      <link rel="stylesheet" src="style.css" />
    </head>
    <body>
      <h1>Spotify 🏖</h1>

      <div id="content" dangerouslySetInnerHTML={
        {
          __html: props.content || "🔥 something went wrong"
        }
      } />

      <script src="client.js"></script>
    </body>
    </html>
  );
}
