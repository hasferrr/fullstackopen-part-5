import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [createNewVisible, setCreateNewVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)

      setUser(loggedUser)
      setUsername('')
      setPassword('')
      setNotification(null)

    } catch (error) {
      showShortNotification('wrong username or password', 'red')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setNotification(null)
  }

  const createNewBlog = async (event) => {
    event.preventDefault()
    const result = await blogService.create({ title, author, url })
    setBlogs([...blogs, result])
    setTitle('')
    setAuthor('')
    setUrl('')
    showShortNotification(`a new Blog ${result.title} by ${result.author}`, 'green')
  }

  const showShortNotification = (text, color) => {
    setNotification({ text, color })
    setTimeout(() => setNotification(null), 5000)
  }

  const blogForm = () => {
    const hideWhenVisible = { display: createNewVisible ? 'none' : '' }
    const showWhenVisible = { display: createNewVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateNewVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            createNewBlog={createNewBlog}
            title={title}
            author={author}
            url={url}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
          />
          <button onClick={() => setCreateNewVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              onChange={({ target: { value } }) => setUsername(value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
            />
          </div>
          <div>
            <button type='submit'>login</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      {blogForm()}
      <br />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App