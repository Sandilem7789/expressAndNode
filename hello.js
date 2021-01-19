var http = require("http");

http.createServer(function(req, res) {
    /* Normalize url by removing querystring, 
     * optional trailing slash,
     * and making it lowercase 
     */
    var path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    switch (path) {
        case "":
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("HomePage");
            break;
        case "/about":
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("About");
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Oops, Not Found");
            break;
    }
}).listen(8000);

console.log("Server started on port 8000: press ctrl-C to terminate");