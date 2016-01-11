# everyone's playlist

## development

Server: `forever index.js --watch`
Client: `npm run watch` or `webpack --progress --watch`

## to do

* `req.callbackParams` will be set as long as there's things in the URL, but
  those params will only work for one auth -- we need to redirect the user back
  to `/` when they're validated


## application structure

### server

- app.js is terrible but handles the lower-level piping
- routes.js defines the routes, which app.js will call from:
- controllers.js defines the controllers. MUST respond with something that
  resolves to a `{ response, code }`-shaped object (either object itself or a
  promise which resolves to the value)
