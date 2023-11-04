import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('title and author are shown', () => {
  const blog = {
    user: 1,
    likes: 10,
    author: 'author',
    title: 'this is a title',
    url: 'google.com',
  }

  const mockHandler = jest.fn()

  render(
    <Blog
      blog={blog}
      updateBlog={mockHandler}
      deleteBlog={mockHandler}
    />
  )

  const element = screen.getByText(`${blog.title} by ${blog.author}`)
  expect(element).toBeDefined()
})