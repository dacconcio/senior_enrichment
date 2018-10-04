const Express = require('express');
const app = new Express();

require('./db/routes.js')(app)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
