'use strict'

const Post = use('App/Models/Post')
const Logger = use('Logger')
const { validate } = use('Validator')

class PostController {
    
    async index({ view,session}){
        // const posts = [
        //     {title:'Post One', body:'This is post one'},
        //     {title:'Post Two', body:'This is post two'},
        //     {title:'Post Three', body:'This is post three'}
        //   ]
        const posts = await Post.all()
       
        return view.render('blog.index',{
            title: 'This is Index page of this Blog!',
           posts: posts.toJSON()
        })
    }

    async show ({params,view}){
        const posts = await Post.find(params.id)

      

        return view.render('blog.post',{
            post:posts
        })
    }

    async create({view}){
        return view.render('blog.add')
    }

    async store({request,response,session}){
        const data = request.all()

        const validation = await validate(request.all(), {
            title: 'required|min:3|max:255',
            body: 'required|min:3'
          })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        // Logger.info('request details %j', {
        //     url: request.url(),
        //     user: request.all()
        //   })
          delete data._csrf
        await Post.create(data)

        session.flash({notification:"Post Added!"})
        return response.redirect('/')

    }

    async edit({params,view}){
        const post = await Post.find(params.id)

        return view.render('blog.edit',{
            post:post,
        })
    }
    async update({params,request,response,session}){
        const data = request.all()
        
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:255',
            body: 'required|min:3'
          })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        // Logger.info('request details %j', {
        //     url: request.url(),
        //     user: request.all()
        //   })
          delete data._csrf
          delete data._method
          await Post.query().where('id',params.id).update(data);

          session.flash({notification:"Post Updated!"})
          return response.redirect('/')
    }
    async destroy({params,request,response,session}){

        await Post.query().where('id',params.id).delete()
        session.flash({info:" Post Deleted"})
        return response.redirect('/')

    }
}

module.exports = PostController
