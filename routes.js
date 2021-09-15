const routes = require("next-routes")(); //() returns a function that is immediately invoked

//add new route mapping
//wildcard variable :
//second argument is which route we want to display
routes
  .add("/campaigns/new", "/campaigns/new")
  .add("/campaigns/:address", "/campaigns/show")
  .add("/campaigns/:address/requests", "/campaigns/requests/index")
  .add("/campaigns/:address/requests/new", "campaigns/requests/new");


module.exports = routes; //exports helpers to help with user navigation