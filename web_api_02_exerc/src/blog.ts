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

    update (id: string, likes?: number, text?: string) : Post | undefined {
        const index = this.posts.findIndex(post => id == post.id)
        if(index !== -1){   
            if (text == undefined && likes){
                this.posts[index].text = this.posts[index].text
                this.posts[index].likes = likes
                return this.posts[index]
            }else if (likes == undefined && text) {
                this.posts[index].text = text
                this.posts[index].likes = this.posts[index].likes
                return this.posts[index]
            }else if (text && likes){
                this.posts[index].text = text
                this.posts[index].likes = likes
                return this.posts[index]
            }else if(text == undefined && likes == undefined){
                this.posts[index].likes += 1
                return this.posts[index]
            }
        }else {
            return undefined
        }
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
