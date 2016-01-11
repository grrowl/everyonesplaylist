# everyone's playlist

## development

Server: `forever index.js --watch`
Client: `npm run watch` or `webpack --progress --watch`

## to do

* `/api/session` doesnt render anything, because the autheticate controller doesn't return a promise or something ?

## application structure

### server

- app.js is terrible but handles the lower-level piping
- routes.js defines the routes, which app.js will call from:
- controllers.js defines the controllers. MUST respond with something that
  resolves to a `{ response, code }`-shaped object (either object itself or a
  promise which resolves to the value)
