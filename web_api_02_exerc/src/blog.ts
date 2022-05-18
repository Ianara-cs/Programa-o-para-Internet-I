import { v4 as uuid } from "uuid"

class Post {
    id: string = ''
    text: string = ''
    likes: number = 0

    constructor(id: string, text: string) {
        this.id = id
        this.text = text
    }
    
}

export class Microblog {
    private posts: Post [] = []

    create (text: string) : Post {
        const newId = uuid()
        const post = new Post(newId, text)
        this.posts.push(post)
        return post
    }

    retrive (id: string) : Post| undefined {
        const post = this.posts.find(post => id == post.id)
        return post
    }

    update (id: string, text?: string, likes?: number) : Post | undefined {
        const post = this.retrive(id)
        if(post){
            if (text === undefined && likes){
                post.text = post.text
                post.likes = likes
            }else if (likes === undefined && text) {
                post.text = text
                post.likes = post.likes
            }else if (text && likes){
                post.text = text
                post.likes = likes
                return post
            }else {
                return undefined
            }
            
        }
        return undefined
    }

    delete (id: string): boolean {
        const index = this.posts.findIndex(post => id == post.id)
        if(index === -1){
            return false
        }
        this.posts.splice(index, 1)
        return true
    }

    retrieveAll () {
        return this.posts
    }
}
