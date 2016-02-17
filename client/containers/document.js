import React from 'react';

export default function clientDocument(props) {
  return (
    <html>
    <head>
      <title>Spotify (umbrella)</title>
      <link rel="stylesheet" href="/fonts/porto.css" />
    </head>
    <body>
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
