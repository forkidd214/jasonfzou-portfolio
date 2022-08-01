import { render, screen } from '@testing-library/react'
import IndexPage from '@/pages/index'

describe('Index Page', () => {
  it('renders a heading', () => {
    render(<IndexPage />)

    expect(
      screen.getByRole('heading', { name: /index page/i })
    ).toBeInTheDocument()
  })
})
