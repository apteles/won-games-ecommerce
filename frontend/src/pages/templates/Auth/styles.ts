import styled, { css } from 'styled-components'
import * as HeadingStyles from 'components/Heading/styles'
import * as LogoStyles from 'components/Logo/styles'
export const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
`

export const BannerOverlay = styled.div`
  ${({ theme }) => css`
    position: relative;
    background-image: url('/img/auth-bg.jpg');
    background-size: cover;
    background-position: center center;
    padding: ${theme.spacings.xxlarge} ${theme.spacings.xxlarge}
      ${theme.spacings.large};

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${theme.colors.black};
      opacity: 0.85;
    }
  `}
`
export const BannerContent = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr;
    justify-content: space-between;

    position: relative;
    z-index: ${theme.layers.base};
    color: ${theme.colors.white};
    min-height: 100%;
  `}
`

export const Subtitle = styled.h3`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxlarge};
    font-weight: ${theme.font.light};
    margin-top: ${theme.spacings.xxsmall};

    strong {
      color: ${theme.colors.primary};
    }
  `}
`

export const Footer = styled.p`
  ${({ theme }) => css`
    align-self: flex-end;
    text-align: center;
    font-size: ${theme.font.sizes.xsmall};
  `}
`

export const ContentRight = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};

    display: grid;
    align-items: center;
    justify-content: center;
  `}
`
export const ContentWrapper = styled.div`
  ${({ theme }) => css`
    width: 30rem;
    ${LogoStyles.Wrapper} {
      margin: 0 auto ${theme.spacings.xxlarge};
    }
    ${HeadingStyles.Wrapper} {
      margin-bottom: ${theme.spacings.medium};
    }
  `}
`
