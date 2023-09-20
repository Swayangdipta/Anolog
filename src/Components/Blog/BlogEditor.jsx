import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { getBlog, publishBlog, updateBlog } from './helper/blogHelper';
import Base from '../Base/Base';
import { getCategories } from '../Base/helper/baseApiCalls';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { isAuthenticated } from '../../utils/LS_Helper';
import { RiLoader3Fill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';

const BlogEditor = () => {
    const [value,setValue] = useState('')
    const [isOptionsOpen,setIsOptionsOpen] = useState(false)
    const [isLoading,setLoading] = useState(false)
    const [categories,setCategories] = useState([])
    const [formValues,setFormValues] = useState({
        title: '',
        description: '',
        coverImage: '',
        category: {
            name: 'Choose Category',
            id: undefined
        }
    })

    const {blogId} = useParams()

    const {title,description,coverImage,category} = formValues

    const {user,token} = isAuthenticated()

    const validateInputs = () => {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+
	    '(\\#[-a-z\\d_]*)?$','i')

        if(title === '' || description === '' || coverImage === '' || value === '' || !category.id){
            toast.error("All fields are mandatory")
            return false
        }else if(description.length > 500){
            toast.error("Desription is too long!")
            return false
        }else if(!urlPattern.test(coverImage)){
            toast.error("Cover Image url is not valid!")
            return false
        }

        return true
    }

    const handlePublish = ev => {
        setLoading(true)
        if(!validateInputs()){
            return
        }

        let blog = {
            ...formValues,
            blog: value,
            category: category.id
        }

        if(blogId){
            updateBlog(user._id,token,blogId,blog).then(data => {
                if(data.response?.data.error){
                    setLoading(false)
                    return toast.error(data.response.data.message[0])
                }else if(data.name === 'AxiosError'){
                    setLoading(false)
                    return toast.error("Faild to update blog! Try again.")
                }

                toast.success("Blog Updated Successfully!")
                setLoading(false)
            }).catch(e=> console.log(e)) 
        }else{
            publishBlog(blog,user._id,token).then(data => {
                if(data.response?.data.error){
                    setLoading(false)
                    return toast.error(data.response.data.message[0])
                }else if(data.name === 'AxiosError'){
                    setLoading(false)
                    return toast.error("Faild to publish blog! Try again.")
                }

                toast.success("Blog Published Successfully!")
                setLoading(false)
            }).catch(e=> console.log(e))            
        }

    }

    const hanleChange = (ev,field) => {
        setFormValues({...formValues,[field]: ev.target.value})
    }

    const handleCategory = cate => {
        setFormValues({...formValues,category: {
            name: cate.name,
            id: cate._id
        }})

        setIsOptionsOpen(!isOptionsOpen)
    }

    const toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link'],
        ['clean'] 
    ]

    useEffect(()=>{
        getCategories().then(data => {
            if(data.response?.data.error){
                toast.error(data.response?.data.error)
                return
            }else if(data.name === 'AxiosError'){
                toast.error('Can not get categories!')
                return
            }

            setCategories(data.data)
        })

        let title  = 'Publish Blog'
        let description = 'Create Blogs the annonymus way.'

        if(blogId){
            title = 'Update Blog'
            description = 'Update Blogs the annonymus way.'
        }

        document.title = title
        let newMetaData = document.createElement('meta')
        newMetaData.setAttribute('name','description')
        newMetaData.setAttribute('content', description)
  
        document.head.appendChild(newMetaData)

        if(blogId !== undefined ){
            loadBlogInformation()
        }
    },[])

    const loadBlogInformation = () => {
        getBlog(blogId).then(data => {
            if(data.response?.data.error){
              return toast.error(data.response.data.message[0])
            }else if(data.name === 'AxiosError'){
              return toast.error("Faild to load blog!")
            }
    
            setFormValues({
                title: data.data.title,
                description: data.data.description,
                coverImage: data.data.coverImage,
                category: {
                    name: data.data.category.name,
                    id: data.data.category._id
                }
            })

            setValue(data.data.blog)
          })
    }

  return (
    <Base>
        <div className='w-[90vw] rounded-md bg-[#111] border-[1px] border-zinc-700 m-auto mt-[80px] p-[30px] flex flex-col items-center gap-[30px] relative top-0'>
            <div className='w-[calc(100%_-_60px)] h-[50px] absolute top-[5px] bg-purple-700 z-[0]'></div>
            <h1 className='w-full h-[60px] absolute top-0 text-zinc-100 font-[600] text-2xl rounded-t-md flex items-center indent-[30px] bg-[#111] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20'>
                Write Anonymusly {blogId && (' | Update')}
            </h1>

            <form className="w-full h-max mt-[60px] flex flex-col">
                <span className='w-full h-max relative top-0'>
                    <label htmlFor="title" className='text-zinc-100 text-2xl'>Title*</label>
                    <div className='w-[calc(100%_-_60px)] h-[20px] absolute top-[50px] left-[30px] bg-purple-500 blur-[5px] z-[0] text-zinc-100'></div>    
                    <input type="text" name="title" value={title} onChange={e=>hanleChange(e,'title')} className='w-full h-[40px] mt-[10px] mb-[10px] indent-[10px] rounded-md bg-[#111] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 border-[1px] border-zinc-700 text-zinc-100' id="" placeholder='Blog Title...' />                
                </span>

                <span className='w-full h-max relative top-0'>
                    <label htmlFor="description" className='text-zinc-100 text-2xl'>Short Description*</label>
                    <div className='w-[calc(100%_-_60px)] h-[30px] absolute top-[50px] left-[30px] bg-purple-500 blur-[5px] z-[0] text-zinc-100'></div>    
                    <textarea name="description" value={description} onChange={e=>hanleChange(e,'description')} className='w-full h-[100px] resize-none p-[10px] mt-[10px] mb-[10px] rounded-md bg-[#111] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 border-[1px] border-zinc-700 text-zinc-100' placeholder='Describe the blog content...'></textarea>
                </span>

                <span className='w-full h-max relative top-0'>
                    <label htmlFor="cover" className='text-zinc-100 text-2xl'>Cover Image Url*</label>
                    <div className='w-[calc(100%_-_60px)] h-[20px] absolute top-[50px] left-[30px] bg-purple-500 blur-[5px] z-[0] text-zinc-100'></div>    
                    <input type="url" name="cover" value={coverImage} onChange={e=>hanleChange(e,'coverImage')} className='w-full h-[40px] mt-[10px] mb-[10px] indent-[10px] rounded-md bg-[#111] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 border-[1px] border-zinc-700 text-zinc-100' id="" placeholder='Cover Image Link...' />                
                </span>

                <span className='w-full h-max relative top-0'>
                    <label htmlFor="category" className='text-zinc-100 text-2xl'>Category*</label>
                    <div className='w-[calc(100%_-_60px)] h-[20px] absolute top-[50px] left-[30px] bg-purple-500 blur-[5px] z-[0] text-zinc-100'></div>    
                    <div name="category" className='w-full h-[40px] z-[100] mt-[10px] mb-[10px] px-[10px] rounded-md relative top-0 bg-[#111] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 border-[1px] border-zinc-700 text-zinc-100' >
                        <div className='w-full h-[40px] flex items-center justify-between cursor-pointer' onClick={e => setIsOptionsOpen(!isOptionsOpen)}>
                            <span>{category.name}</span>
                            {
                                isOptionsOpen ? (<FaCaretUp />) : (<FaCaretDown />)
                            }
                        </div>
                        {
                            isOptionsOpen && (
                                <div id="category_options" className={`w-full p-2 px-4 h-max bg-slate-900 backdrop-filter backdrop-blur-3xl absolute top-[40px] left-0 flex flex-col gap-[10px] z-[10000]`}>
                                    {
                                        categories.length > 0 ? categories.map((cate,index) => (
                                            <div key={index} className='cursor-pointer w-full h-[40px] flex items-center bg-slate-800 rounded pl-2 hover:bg-zinc-900' onClick={e => handleCategory(cate)}>{cate.name}</div>
                                        )) : ('')
                                    }
                                </div>                                
                            )
                        }

                    </div>                
                </span>
            </form>

            <div className='w-full h-max relative top-0 bg-[#111]'>
                <div className='w-[calc(100%_-_60px)] h-[calc(100%_-_90px)] absolute top-[60px] left-[30px] bg-[#3d2755c7] blur-[30px] z-[0]'></div>    
                <ReactQuill style= {{width: '100%',zIndex: "1000"}} placeholder='Start Typing...' modules={{
                    toolbar: toolbarOptions
                }} theme='snow' value={value} onChange={setValue} />
            </div>
            <div className='w-full h-max relative top-0 flex items-center justify-between'>
                {!blogId && (<h2 className='text-zinc-300 '>Publishing as Anonymus</h2>)}
                <button onClick={handlePublish} className='px-[30px] py-[10px] font-[500] rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500'>{isLoading ? <RiLoader3Fill className='animate-spin' /> : blogId ? "Update" : "Publish"}</button>
            </div>
        </div>
    </Base>
  )
}

export default BlogEditor