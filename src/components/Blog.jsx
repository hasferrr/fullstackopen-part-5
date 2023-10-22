import { useState } from 'react'
import './Blog.css'

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)

  const incrementLike = () => {
    updateBlog(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })
  }

  return (
    <div className='blog'>
      <div>
        {blog.title} by {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'show'}
        </button>
      </div>
      <div style={{ display: visible ? '' : 'none' }}>
        <a href={blog.url}>{blog.url}</a>
        <div>
          likes {blog.likes}
          <button onClick={incrementLike}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog