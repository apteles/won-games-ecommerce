import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import Highlight from '.'

const props = {
  title: "Read Dead it's back",
  subtitle: "come see john's new adventures",
  buttonLabel: 'Buy now',
  buttonLink: 'https://dummy.com',
  backgroundImage: 'read-dead.jpg'
}

describe('<Highlight />', () => {
  it('should render the headings and button', () => {
    renderWithTheme(<Highlight {...props} />)

    expect(
      screen.getByRole('heading', { name: /Read Dead it's back/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /come see john's new adventures/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('link', { name: /buy now/i })).toBeInTheDocument()
  })

  it('should render highlight with background image', () => {
    const { container } = renderWithTheme(<Highlight {...props} />)

    expect(container.firstChild).toHaveStyle({
      backgroundImage: `url(${props.backgroundImage})`
    })
  })
})
