//import { query } from 'express'
import { FieldValue } from 'firebase-admin/firestore'
import { db } from "./firebase.config"


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
    async create (text: string): Promise<Post| undefined> {
        if(text){
            const post =  db.collection('posts').doc()
            const postObject = {
                id: post.id,
                text: text,
                likes: 0,
                data: new Date
            }
            post.set(postObject)
            return postObject
        }
        
    }

    async retrive (id: string) : Promise< Post| undefined> {
        const querySnapshot: any = await db.collection('posts').doc(id).get()
        if(!querySnapshot.exists){
            return undefined
        }
        return querySnapshot.data()
    }

    async update (id: string, likes?: number, text?: string) : Promise<Post | undefined> {
        const postExist = await this.retrive(id)
        const post = db.collection('posts').doc(id)
        if(!postExist){  
            return undefined 
        }
        
        if (text == undefined && likes){
            post.update({likes: likes})
            return await this.retrive(id)
        }else if (likes == undefined && text) {
            post.update({text: text})
            return await this.retrive(id)
        }else if (text && likes){
            post.update({
                likes: likes,
                text: text
            })
            return await this.retrive(id)
        }
        
        if(text == undefined && likes == undefined){
            post.update({
                likes: FieldValue.increment(1)
            })
            return await this.retrive(id)
        }
    }

    async delete (id: string): Promise<boolean> {
        const post = await this.retrive(id)
        if(!post){
            return false
        }
        db.collection('posts').doc(id).delete()
        return true
        
    }

    async retrieveAll (q?:string, page?:number, lim?: string, offs?: string): Promise<Post[]> {
        const allPosts: Post[] = []
        const postsRef = db.collection('posts')
        
        if(q) {
            const querySnapshot = await postsRef.where("text", "==", q).get()
            querySnapshot.forEach((doc: any) => allPosts.push(doc.data()))
        }

        if(page === undefined && lim === undefined && offs === undefined && q === undefined){
            page = 1
        }
        if(page) {
            if (page > 0) {
                const querySnapshot = await postsRef.orderBy('data', 'desc')
                .limit(10*page - 9)
                .get()
    
                const last = querySnapshot.docs[querySnapshot.docs.length - 1]
    
                const next = await postsRef.orderBy('data', 'desc')
                .startAt(last.data().data)
                .limit(10).get()
                next.forEach((doc: any) => allPosts.push(doc.data()))
            }
        }
        if(lim && offs) {
            const offset = parseInt(offs, 10)
            const limit = parseInt(lim, 10)

            const querySnapshot = await postsRef.orderBy('data', 'desc')
            .limit(offset)
            .get()

            const last = querySnapshot.docs[querySnapshot.docs.length - 1]

            const next = await postsRef.orderBy('data', 'desc')
            .startAt(last.data().data)
            .limit(limit).get()
            next.forEach((doc: any) => allPosts.push(doc.data()))
        }
        return allPosts
    }
}

