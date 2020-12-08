import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import GameCard from '.'

const props = {
  title: "Read Dead it's back",
  developer: 'Rockstar Games',
  img: '/img/red-dead-img.jpg',
  price: 'R$ 235,00'
}

describe('<GameCard />', () => {
  it('should render the heading', () => {
    renderWithTheme(<GameCard {...props} />)

    expect(
      screen.getByRole('heading', { name: /Read Dead /i })
    ).toBeInTheDocument()
  })
})
