var http = require("http");
var fs = require("fs");

function serveStaticFiles(res, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data) {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("500 - Internal Error");
        } else {
            res.writeHead(responseCode, { "Content-Type": contentType });
            res.end(data);
        }
    });
}

http.createServer(function(req, res) {
    /* Normalize url by removing querystring, 
     * optional trailing slash, and making it lowercase 
     */
    var path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    switch (path) {
        case "":
            serveStaticFiles(res, "/public/home.html", "text/html");
            break;
        case "/about":
            serveStaticFiles(res, "/public/about.html", "text/html");
            break;
        case "/img/man.png":
            serveStaticFiles(res, "/img/man.png", "image/png");
            break;
        default:
            serveStaticFiles(res, "/public/404.html", "text/html", 404)
            break;
    }
}).listen(8000);

console.log("Server started on port 8000: press ctrl-C to terminate");