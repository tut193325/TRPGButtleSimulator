//
// Sample http server using node.js
//   It works for "readMe.html, simple.html, simple.css, simple.js, umemura.jpg, and
//   video : './20180310-rehearsal.mp4.
//
//
const http = require('http'); 
const fs = require('fs'); 
const url = require('url');

const htmlData = fs.readFileSync('./simple.html', 'UTF-8');
const cssData =  fs.readFileSync('./simple.css', 'UTF-8');
const jsData =  fs.readFileSync('./simple.js', 'UTF-8');
// const jpegData = fs.readFileSync('./umemura.jpg');
// const videoPath = './20180310-rehearsal.mp4';

// Note that this service responds 'readme.html' (not 'index.html') for  '/'.
function serviceClient(request, response) {
    const urlInformation = url.parse(request.url);
    
    switch(urlInformation.pathname) {
    case '/':
	fs.readFile('./simple.html', 'UTF-8',
		function(error, data) {
		    response.writeHead(200, {'Content-Type' : 'text/html'});
		    response.write(data);
		    response.end(); } );
	break;
    case '/simple.html':
	response.writeHead(200, {'Content-Type' : 'text/html'});
	response.write(htmlData);
	response.end(); 
	break;
    case '/simple.css':
	response.writeHead(200, {'Content-Type' : 'text/css'});
	response.write(cssData);
	response.end(); 
	break;
    case '/simple.js':
	response.writeHead(200, {'Content-Type' : 'text/javascript'});
	response.write(jsData);
	response.end(); 
	break;
    // case '/umemura.jpg':
	// response.writeHead(
	// 		   200, 
	// 		   {'Content-Type' : 'image/jpeg', 
	// 		    'Content-Length' : jpegData.length,
	// 		   });
	// response.write(jpegData);
	// response.end(); 
	// break;
    // case '/20180310-rehearsal.mp4':
	// // reference: https://medium.com/@daspinola/video-stream-with-node-js-and-html5
	// // Note that video file may be very large file. 
	// const path = videoPath;
	// const stat = fs.statSync(path);
	// const fileSize = stat.size;
	// const range = request.headers.range;
	// if (range) {
	//   const parts = range.replace(/bytes=/, "").split("-");
	//   const start = parseInt(parts[0], 10);
	//   const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
	//   const chunksize = (end-start)+1;
	//   const file = fs.createReadStream(path, {start, end});
	//   const head = {
	//       'Content-Range': `bytes ${start}-${end}/${fileSize}`,
	//       'Accept-Ranges': 'bytes',
	//       'Content-Length': chunksize,
	//       'Content-Type': 'video/mp4',
	//   }
	//   response.writeHead(206, head);
	//   file.pipe(response);
	// } else {
	//   const head = {
	//       'Content-Length': fileSize,
	//       'Content-Type': 'video/mp4',
	//   }
	//   response.writeHead(200, head);
	//   fs.createReadStream(path).pipe(response);
	// }
	// break;


    default:
	response.writeHead(404, {'Content-Type' : 'text/plain'});
	response.write(urlInformation.pathname);
	response.end();
    }
}
		
const server = http.createServer(serviceClient);
const serverPort = process.env.PORT || 3000; // For Heroku
server.listen(serverPort);
console.log('server.listen at ' + serverPort);