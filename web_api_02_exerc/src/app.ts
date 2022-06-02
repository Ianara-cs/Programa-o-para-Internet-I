import express, { Request, Response } from 'express'
import { Microblog } from './blog'

const blog = new Microblog()

const app = express()

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


app.get('/posts/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const post = await blog.retrive(id)
    
    if(!post){
        res.status(404).send('Não encontrado')
    }
    
    res.json(post)
})

app.delete('/posts/:id', async (req: Request, res: Response) => {
    const postId = req.params.id
    const deleted = await blog.delete(postId)
    if(deleted == false) {
        res.status(404).send('Não foi encontrado')
    }
    res.status(204).json(deleted)
})

app.post('/posts', async (req: Request, res: Response) => {
    const {text} = req.body
    const post = await blog.create(text)
    if(!post){
        res.status(400).send('O campo texto está vazio!')
        return
    }
    res.status(201).json({data: post})
    
})

app.put('/posts/:id', async (req: Request, res: Response) => {
    const postId = req.params.id
    const {text, likes} = req.body
    const updatePost = await blog.update(postId, likes, text)
    if(!updatePost) {
        res.status(404).send('Não encontrado')
    }
    res.json(updatePost)
})

app.patch('/posts/:id', async (req: Request, res: Response) => {
    const postId = req.params.id
    const likes = req.body.likes
    const text = req.body.text
    const updatePost = await blog.update(postId, likes, text)
    if(!updatePost){
        res.status(404).send('Não encontrado');
    }
    res.json(updatePost)
})

app.patch('/posts/:id/like', async (req: Request, res: Response) => {
    const postId = req.params.id
    const updatePost = await blog.update(postId)
    if(!updatePost){
        res.status(404).send('Não encontrado');
    }
    res.json(updatePost)
})

app.use(function(req, res, next) {
    res.status(404).send('Não encontrado');
});


app.listen('3000', () => {
    console.log('Servidor rodando!')
})


