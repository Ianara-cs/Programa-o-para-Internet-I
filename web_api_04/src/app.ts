import cors from 'cors'
import express, { Request, Response } from 'express'
import { Microblog } from './microblog'

const blog = new Microblog()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/posts', async (req: Request, res: Response) => {
    const q: any = req.query.q
    const page: any = req.query.page
    const limit: any = req.query.limit
    const offset: any = req.query.offset
    
    const posts = await blog.retrieveAll(q, page, limit, offset)
    res.json(posts)
})

app.post('/posts', async (req: Request, res: Response) => {
    const {text} = req.body
    const post = await blog.create(text)
    if(!post){
        res.status(400).send('O campo texto está vazio!')
        return
    }
    res.status(201).json({id: post.id, text, likes: post.likes})
    
})


app.listen('3000', ()=> {
    console.log("Servidor rodando!")
})