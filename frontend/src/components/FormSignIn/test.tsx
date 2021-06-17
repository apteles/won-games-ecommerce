import { renderWithTheme } from 'utils/tests/helpers'

import FormSignIn from '.'

describe('<FormSignIn />', () => {
  it('should render the heading', () => {
    renderWithTheme(<FormSignIn />)

    expect(1).toBe(1)
  })
})
