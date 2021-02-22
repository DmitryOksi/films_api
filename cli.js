const yargs = require('yargs');
const axios = require('axios').default;
const fs = require('fs');
const {
    argv,
} = yargs;
const {
    task,
    title,
    release_year,
    format,
    stars,
    id,
    order,
} = argv;

switch (task) {
    case 1:
        axios({
            method: 'post',
            url: 'http://localhost:3157/films/',
            data: {
                title,
                release_year,
                format,
                stars,
            }
        }).then((response) => {
            console.log(response.data);
        }).catch((e) => {
            console.log(e.response.data)
        });
        break
    case 2:
        axios.delete(`http://localhost:3157/films/${id}`).then((response) => {
            console.log(response.data);
        }).catch((e) => {
            console.log(e.response.data)
        });
        break
    case 3:
        axios.get(`http://localhost:3157/films/${id}`).then((response) => {
            console.log(response.data);
        }).catch((e) => {
            console.log(e.response.data)
        });
        break
    case 4:
        axios.get(`http://localhost:3157/films/order-sort/${order}`).then((response) => {
            console.log(response.data);
        }).catch((e) => {
            console.log(e.response.data)
        });
        break
    case 5:
        axios.get(`http://localhost:3157/films/title/${title}`).then((response) => {
            console.log(response.data);
        }).catch((e) => {
            console.log(e.response.data)
        });
        break
    case 6:
        axios.get(`http://localhost:3157/films/star/${stars}`).then((response) => {
            console.log(response.data)
        }).catch((e) => {
            console.log(e.response.data)
        });
        break
    case 7:
        const FormData = require('form-data');
        const form = new FormData();
        form.append('file', fs.createReadStream(`/home/dzmitry/Documents/projects/TZS/webby_lab/data.txt`));

        const request_config = {
            headers: {
                ...form.getHeaders()
            }
        };

        axios.post(`http://localhost:3157/films/file`, form, request_config).then((response) => {
            console.log(response.data);
        }).catch((e) => {
            console.log(e.response.data)
        });
        break
    case 8:
        axios.get(`http://localhost:3157/films/star-title/${stars}/${title}`).then((response) => {
            console.log(response.data);
        }).catch((e) => {
            console.log(e.response.data)
        });
        break;
}