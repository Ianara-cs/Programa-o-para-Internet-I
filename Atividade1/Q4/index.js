const {default: axios} = require('axios')

async function allLinks (){

    let res = await axios.get('https://www.google.com')
    console.log(res.data.match(/<.a?>.+?<.a?>/g))
}

allLinks()

