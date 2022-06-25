const http = require('http');
const fs = require('fs'); //module for reading and writting files.

const requestHandler = (req,res) =>{
    res.writeHead(200,'the is the response',{'application-type' : 'text/html'});
    
    // fs.appendFile()

    // res.end('<h1>I am Batman </h1>')
    //find the file and read the file.
    // fs.readFile('./index.html',(err,data) => {
    //     if(err){
    //         console.log('error',err);
    //         return res.end('<h1>Error!</h1>')
    //     }
    //     res.end(data);
    // })

    let filePath;

    switch (req.url) {
        case '/info':
            filePath = './info.html';
            break;
        
        case '/':
            filePath = './index.html';
            break;

        default:
            filePath = './404.html'
            break;
    }

    fs.readFile(filePath,(err,data) => {
        if(err){
            res.end('file not found');
        }
        res.end(data);
    })
}

const server = http.createServer(requestHandler);


server.listen('3001',(err) => {
    console.log('server is up and running');
})