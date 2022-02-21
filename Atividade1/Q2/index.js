const axios = require('axios');

axios.get('https://www.ifpi.edu.br')
.then((res) => {
    console.log(res.status)
    console.log(res.statusText)
    console.log(res.headers['vary'])
    console.log(res.headers['content-type'])
    console.log(res.headers['content-language'])
    console.log(res.headers['content-length'])
    console.log(res.headers['date'])
    console.log(res.config['url'])
    console.log(res.config['method'])
    console.log(res.data)

}).catch((err) => {
    console.log(err.code)
})
