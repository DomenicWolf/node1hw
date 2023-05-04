const fs = require('fs'); 
const process = require('process'); 
const axios = require('axios');


function cat (path) {
    fs.readFile(`${path}`,'utf8',(err,data) => {
        if(err){
            console.log(err);
            process.kill(1)
        }
        console.log('Data is:',data)
        return data
    })
}

async function webCat(url) {
    
    try {
        let resp = await axios.get(url);
        console.log(resp.data);
        return resp.data
      } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
      }
}

async function webWrite (p,c) {
    let res = webCat(c)
    fs.writeFile(p,res,{encoding:'utf8',flag:'a'},err => {
        if (err){
            console.log(err);
            process.kill(1)
        }
        console.log('success!')
    })
}

function catWrite (p,c) {
    let res = cat(c)
    console.log(c)
    console.log(cat(c))
    fs.writeFile(p,res,{encoding:'utf8',flag:'a'},err => {
        if (err){
            console.log(err);
            process.kill(1)
        }
        console.log('success!')
    })
}
/*cat(process.argv[0]);
cat(process.argv[2])*/

let path = process.argv[2];

if (path === '--out'){
    if (process.argv[4].slice(0, 4) === 'http') {
        webWrite(process.argv[3],process.argv[4]);
      } else {
        catWrite(process.argv[3],process.argv[4]);
      }
}

if (path.slice(0, 4) === 'http') {
  webCat(path);
} else {
  cat(path);
}