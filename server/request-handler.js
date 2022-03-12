/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var basicServer = require('./basic-server.js');

var requestHandler = function(request, response) {

  // The method here will always be a normal HTTP method/verb. The url is the full URL without the server, protocol or port.

  // STEP 1: get the method, url and headers of the incoming request

  const method = request.method;
  const url = request.url;
  const reqHeaders = request.headers;
  console.log('method:::', method);
  console.log('url:::', url);
  console.log('reqHeaders:::', reqHeaders);

  /*
  STEP 2: handle each request method appropriately

    if method type is GET
      send data from messages file to the client
    if method type is POST
      retrieve data (request body) from request object and store in messages file
    if method type is put/patch
      update a resource (request body)
    if method type is delete
      search through messages data and remove the target message
    if method type is options
      do something
  */

  // STEP 3: need to rout the request to the correct api endpoint

  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept, authorization',
    'access-control-max-age': 10 // Seconds.
  };

  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'text/plain';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  response.end(JSON.stringify('Hello, World'));
};

var testFunction = function() {
  console.log('test function');
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.


module.exports.requestHandler = requestHandler;
module.exports.testFunction = testFunction;


/*

sub-problem 1: write a proper request handling function
sub-problem 2: where does the api endpoint fit in the server architecture
sub-problem 3: getting the resources requested at the api endpoint
sub-problem 4:


*/