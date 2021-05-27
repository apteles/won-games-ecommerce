import Heading from 'components/Heading'
import Logo from 'components/Logo'
import * as S from './styles'

type AuthProps = {
  title: string
  children: React.ReactNode
}
const Auth = ({ title, children }: AuthProps) => (
  <S.Wrapper>
    <S.BannerBlock>
      <Logo />

      <Heading>All your favorite games in on place</Heading>
      <S.Subtitle>
        <strong>WON</strong> is the best and most complete gaming platform
      </S.Subtitle>

      <S.Footer>Won Games 2021 &copy; Todos os Direitos Reservados</S.Footer>
    </S.BannerBlock>

    <S.ContentRight>
      <Logo color="black" size="large" />
      <Heading color="black" lineColor="secondary" lineLeft>
        {title}
      </Heading>
      {children}
    </S.ContentRight>
  </S.Wrapper>
)

export default Auth
