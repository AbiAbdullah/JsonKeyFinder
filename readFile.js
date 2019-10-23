const fs = require('fs');
const JsonFind = require('json-find');
// desired json file
const FILE_NAME = 'es.json';
let doc;

const readFileAsync = () => {
    fs.readFile(FILE_NAME, (error, data) => {
        // console.log('Async Read: starting...');
        if (error) {
            console.log('Async Read: NOT successful!');
            console.log(error);
        } else {
            try {
                const dataJson = JSON.parse(data);
                // console.log('Async Read: successful!');
                doc = JsonFind(dataJson);
            } catch (error) {
                console.log(error);
            }
        }
    });
};
readFileAsync();
let stdin = process.openStdin();
process.stdout.write('Enter text: ')
stdin.addListener("data", function (searchText) {
    const text = searchText.toString().trim();
    // console.log("you entered: [" +
    //     searchText.toString().trim() + "]");
    // change text based on json key
    const keyText = (text.replace(/ /g, "_")).toUpperCase();
    const test = doc.checkKey(keyText);
    console.log(`Translate: ${test}`);
    process.stdout.write('Enter text: ')
});