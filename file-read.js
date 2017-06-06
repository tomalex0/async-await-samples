var fs = require('fs');

async function read1 () {

    return new Promise((resolve, reject) => {
        fs.readFile('./data/fname.json', (err, data) => {

            if (err) {
                reject(err);
                return;
            }

            let nameObj = JSON.parse(data);
            console.log(nameObj,'--read1');
            resolve(nameObj.value);

        });
    });

}

async function read2 () {
    var firstName = await read1();

    return new Promise((resolve, reject) => {
        fs.readFile('./data/lname.json', (err, data) => {

            if (err) {
                reject(err);
                return;
            }

            let nameObj = JSON.parse(data);
            console.log(nameObj,'--read2');
            resolve(`${firstName} - ${nameObj.value}`);

        });
    });
}

async function asyncFun () {
    var fullName = await read2();
    var value = await Promise
        .resolve(1)
        .then(x => x * 3)
        .then(x => x + 5)
        .then(x => x / 2);
    return `${value} - ${fullName}`;
}
try {
  asyncFun().then(x => console.log(`x: ${x}`));
} catch (e){
  console.log(e);
}
