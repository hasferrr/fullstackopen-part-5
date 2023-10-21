import { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateNewBlog = (event) => {
    event.preventDefault()
    createNewBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNewBlog}>
        <div>
          title:
          <input
            type='text'
            value={title}
            onChange={({ target: { value } }) => setTitle(value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            onChange={({ target: { value } }) => setAuthor(value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            onChange={({ target: { value } }) => setUrl(value)}
          />
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm