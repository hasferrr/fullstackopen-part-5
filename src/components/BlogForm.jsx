const BlogForm = ({
  createNewBlog,
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNewBlog}>
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