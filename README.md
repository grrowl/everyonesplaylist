# everyone's playlist

Work-in-progress of a Universal React-powered Spotify API application with an
experimental UI. Open-sourced early to illustrate how to
[enable hot reloading in an existing React app](https://github.com/grrowl/everyonesplaylist/commit/e5ac9b9b63e32cef262909ee45737ccfe2f04373)
— [read the article](https://medium.com/p/a-practical-guide-to-enabling-hot-reloading-in-your-react-app-with-code-b6c7d38ea70b).

As such, the app as a whole is rough, and the past README is more musing than
documentation. Feel free to peruse.

## development

Developmemt: `npm run dev` - starts server with hot reloading
Production:
  * `npm start` - compiles assets and runs server or
  * `npm run serve` - just runs server

## application structure

### server

- app.js is terrible but handles the lower-level piping
- routes.js defines the routes, which app.js will call from:
- controllers.js defines the controllers. MUST respond with something that
  resolves to a `{ response, code }`-shaped object (either object itself or a
  promise which resolves to the value)
- experiments.js are experiments fired by the `experiment` controller

## credits

We've adapted much of the bootstrapping code from the wonderful
simple-redux-boilerplate repo.

There's a bit of swearing in the places that need improvement. Watch out if you're not a fan of it.
