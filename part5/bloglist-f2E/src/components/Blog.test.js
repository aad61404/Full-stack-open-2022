import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()
  const blog = {
    id: 'abcdefghi',
    title: 'Title',
    url: 'https://dom.com',
    likes: 0,
    author: 'Author',
  }

  beforeEach(() => {
    component = render(
      <Blog
        key={blog.id}
        blog={blog}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
      />
    )
  })

  test('renders title and author but not url or likes by default', () => {
    expect(component.container.querySelector('.title')).toHaveTextContent(
      blog.title
    )
    expect(component.container.querySelector('.author')).toHaveTextContent(
      blog.author
    )
    expect(component.queryByText(blog.url)).not.toBeInTheDocument()
    expect(component.queryByText('like')).not.toBeInTheDocument()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.extra-info')

    expect(div).toEqual(null)
  })
})