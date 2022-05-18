import express, { Request, Response } from 'express'
import { Microblog } from './blog'

const blog = new Microblog()


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/posts', (req: Request, res: Response) => {
    const posts = blog.retrieveAll()
    res.json(posts)
})


app.get('/posts/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const post = blog.retrive(id)
    
    if(!post){
        res.status(404).send('Não encontrado')
    }
    
    res.json(post)
})

app.delete('/posts/:id', (req: Request, res: Response) => {
    const postId = req.params.id
    const deleted = blog.delete(postId)
    if(deleted == false) {
        res.status(404).send('Não encontrado')
    }
    res.status(204)
})

app.post('/posts', (req: Request, res: Response) => {
    const {text} = req.body
    const post = blog.create(text)
    res.status(201).json(post)
})

app.put('/posts/:id', (req: Request, res: Response) => {
    const postId = req.params.id
    const {text, likes} = req.body
    const updatePost = blog.update(postId, text, likes)
    if(!updatePost) {
        res.status(404).send('Não encontrado')
    }
    res.json(updatePost)
})

app.patch('/posts/:id', (req: Request, res: Response) => {
    const postId = req.params.id
    const {text, likes} = req.body
    const updatePost = blog.update(postId, text, likes)
    if(!updatePost){
        res.status(404).send('Não encontrado');
    }
    res.json(updatePost)
})

app.patch('/posts/:id/like', (req: Request, res: Response) => {
    const postId = req.params.id
    const {likes} = req.body
    const updatePost = blog.update(postId, likes)
    res.json(updatePost)
})

app.use(function(req, res, next) {
    res.status(404).send('Não encontrado');
});


app.listen('3000', () => {
    console.log('Servidor rodando!')
})


