const app = require("./app");

// Defind Localhost Server 
const localServerUrl = "http://localhost:5000"

app.listen(5000, () => console.log('AI server started on ' + localServerUrl))