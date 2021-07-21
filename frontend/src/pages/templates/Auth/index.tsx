import Link from 'next/link'
import Heading from 'components/Heading'
import Logo from 'components/Logo'
import * as S from './styles'

type AuthProps = {
  title: string
  children: React.ReactNode
}
const Auth = ({ title, children }: AuthProps) => (
  <S.Wrapper>
    <S.BannerOverlay>
      <S.BannerContent>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>

        <div>
          <Heading size="huge">All your favorite games in on place</Heading>
          <S.Subtitle>
            <strong>WON</strong> is the best and most complete <br /> gaming
            platform.
          </S.Subtitle>
        </div>

        <S.Footer>Won Games 2021 &copy; Todos os Direitos Reservados</S.Footer>
      </S.BannerContent>
    </S.BannerOverlay>

    <S.ContentRight>
      <S.ContentWrapper>
        <Link href="/">
          <a>
            <Logo color="black" size="large" id="logo-signin" />
          </a>
        </Link>
        <Heading color="black" lineColor="secondary" lineLeft>
          {title}
        </Heading>
        {children}
      </S.ContentWrapper>
    </S.ContentRight>
  </S.Wrapper>
)

export default Auth
