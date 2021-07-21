import Link from 'next/link'
import TextField from 'components/TextField'
import { Email, Lock } from '@styled-icons/material-outlined'
import * as S from './styles'
import Button from 'components/Button'

const FormSignIn = () => (
  <S.Wrapper>
    <form>
      <TextField
        name="email"
        placeholder="Email"
        type="email"
        icon={<Email />}
      />

      <TextField
        name="password"
        placeholder="Password"
        type="password"
        icon={<Lock />}
      />
      <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>

      <Button size="large" fullWidth>
        Sign in now
      </Button>
      <S.FormLink>
        Don&apos;t have an account?
        <Link href="/sign-up">Sign up</Link>
      </S.FormLink>
    </form>
  </S.Wrapper>
)

export default FormSignIn
