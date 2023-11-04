import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Togglable />', () => {
  let container

  const blog = {
    user: 1,
    likes: 10,
    author: 'author',
    title: 'this is a title',
    url: 'google.com',
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        updateBlog={mockHandler}
        deleteBlog={mockHandler}
      />
    ).container
  })

  test('title and author are shown', () => {
    const element = screen.getByText(`${blog.title} by ${blog.author}`)
    expect(element).toBeDefined()
  })

  test('URL and likes are shown after show button has been clicked', async () => {
    const element = screen.getByText(`${blog.title} by ${blog.author}`)
    const button = element.querySelector('button')

    const user = userEvent.setup()
    await user.click(button)

    const div = container.querySelectorAll('div')
    const anchorUrl = screen.getByText(blog.url)
    const likeElement = screen.getByText(`likes ${blog.likes}`)

    expect(div[1]).not.toHaveStyle({ display: 'none' })
    expect(anchorUrl).toBeDefined()
    expect(likeElement).toBeDefined()
  })
})