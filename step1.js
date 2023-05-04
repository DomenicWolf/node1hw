const fs = require('fs'); 
const process = require('process'); 

function cat (path) {
    fs.readFile(`${path}`,'utf8',(err,data) => {
        if(err){
            console.log(err);
            process.kill(1)
        }
        console.log('Data is:',data)
    })
}

/*cat(process.argv[0]);*/
cat(process.argv[2])