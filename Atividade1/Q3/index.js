const {default: axios} = require('axios')
const fs = require('fs')

let url = 'https://images.pexels.com/photos/9656957/pexels-photo-9656957.jpeg?cs=srgb&dl=pexels-esrageziyor-9656957.jpg&fm=jpg'

async function downloadImg(){

    let response = await axios.get(url, {responseType: 'stream'})
    response.data.pipe(fs.createWriteStream('./Q3/imagem.jpg'))
}

downloadImg()