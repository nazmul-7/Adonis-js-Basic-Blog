'use strict'

class PostController {
    
    async index({ view}){
        const posts = [
            {title:'Post One', body:'This is post one'},
            {title:'Post Two', body:'This is post two'},
            {title:'Post Three', body:'This is post three'}
          ]
        return view.render('blog.index',{
            title: 'This is Index page of this Blog!',
            posts: posts
        })
    }
}

module.exports = PostController
