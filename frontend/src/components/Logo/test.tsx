import { screen } from '@testing-library/react'
import 'jest-styled-components'
import { renderWithTheme } from '../../utils/tests/helpers'
import Logo from '.'

describe('<Logo />', () => {
  it('should render a white label by default', () => {
    renderWithTheme(<Logo />)
    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
      color: '#FAFAFA'
    })
  })

  it('should render the logo with id passed', () => {
    const { container } = renderWithTheme(<Logo id="custom_id" />)
    expect(container.querySelector('#paint_linear_custom_id'))
  })

  it('should render a black label when color is passed', () => {
    renderWithTheme(<Logo color="black" />)
    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
      color: '#030517'
    })
  })

  it('should render a bigger logo', () => {
    renderWithTheme(<Logo size="large" />)
    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
      width: '20rem'
    })
  })

  it('shoud render a normal logo', () => {
    renderWithTheme(<Logo />)
    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
      width: '11rem'
    })
  })

  it('should render a bigger logo without text if hideOnMobile', () => {
    renderWithTheme(<Logo hideOnMobile />)
    expect(
      screen.getByLabelText(/Won Games/i).parentElement
    ).toHaveStyleRule('width', '5.8rem', { media: '(max-width: 768px)' })
  })
})
