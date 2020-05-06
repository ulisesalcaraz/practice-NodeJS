let http = require("http");
let url = require("url");
let querystring = require("querystring");

let { countries } = require("countries-list");

let server = http.createServer((request, response) => {
	let parsedUrl = url.parse(request.url);
	let pathname = parsedUrl.pathname;
	let query = querystring.parse(parsedUrl.query);

	if (pathname === "/") {
		response.writeHead(200, { "Content-Type": "text/html" });
		response.write(
			"<html><body><h1>HOME PAGE</h1><p>Hello Client!</p></body></html>"
		);
		response.end();
	} else if (pathname === "/exit") {
		response.writeHead(200, { "Content-Type": "text/html" });
		response.write(
			"<html><body><h1>EXIT PAGE</h1><p>Goodbye Client!</p></body></html>"
		);
		response.end();
	} else if (pathname === "/country") {
		response.writeHead(200, {
			"Content-Type": "application/json",
		});
		response.write(JSON.stringify(countries[query.code]));
		response.end();
	} else {
		response.writeHead(404, { "Content-Type": "text/html" });
		response.write("<html><body><h1>404</h1><p>Not Found</p></body></html>");
		response.end();
	}
});

server.listen(4000);
console.log("running on port 4000");
