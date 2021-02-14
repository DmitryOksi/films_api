const readline = require('readline');
const fs = require('fs');

const parseFileToJson = (filename) => {
    return new Promise((res, rej) => {
        try {
            const path = `/home/dzmitry/Documents/projects/TZS/webby_lab/uploads/${filename}`
            const readInterface = readline.createInterface({
                input: fs.createReadStream(path),
            });
            let docs = [];
            let values = [];
            readInterface
                .on('line', function (line) {
                    if (line.length) {
                        const arr = line.split(': ');
                        arr.shift()
                        const value = arr.join(': ');
                        values.push(value);
                    } else {
                        if (values.length) {
                            docs.push({
                                title: values[0],
                                release_year: values[1],
                                format: values[2],
                                stars: values[3],
                            });
                        }
                        values = [];
                    }
                })
                .on('close', () => {
                    fs.unlinkSync(path);
                    res(docs);
                })
        } catch (e) {
            rej(e.message);
        }
    })
}
module.exports = {
    parseFileToJson
};