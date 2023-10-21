import { useState } from 'react'
import './Blog.css'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

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
          <button>like</button>
        </div>
        <div>added by {blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog