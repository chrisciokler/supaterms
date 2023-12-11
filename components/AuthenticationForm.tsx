"use client"
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { create } from 'zustand'
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Container,
  Title,
  ButtonProps,
  Center,
  Stack,
  Box,
  rem,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import classes from './AuthenticationForm.module.css';

export function ForgotPassword() {
  const toggle = useTypeStore((state: any) => state.toggle)

  return (
    <Container className='w-full' p={0}>
      <p className='text-glow text-2xl font-bold mb-8'>
        Forgot password?
      </p>

      <Paper mt="xl" className='w-full'>
        <TextInput label="Your email" description="Enter your email to get a reset link" placeholder="me@email.com" required />
        <Group justify="space-between" mt="lg" className={classes.controls}>
          <Anchor c="dimmed" size="sm" className={classes.control} onClick={toggle}>
            <Center inline>
              <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              <Box ml={5}>Back to the login page</Box>
            </Center>
          </Anchor>
          <Button className={classes.control}>Reset</Button>
        </Group>
      </Paper>
    </Container>
  );
}


function GoogleIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 262"
      style={{ width: '0.9rem', height: '0.9rem' }}
      {...props}
    >
      <path
        fill="#4285F4"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      />
      <path
        fill="#34A853"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      />
      <path
        fill="#FBBC05"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      />
      <path
        fill="#EB4335"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      />
    </svg>
  );
}

export function GoogleButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
  return <Button leftSection={<GoogleIcon />} variant="default" {...props} />;
}

const useTypeStore = create((set) => ({
  type: "login",
  toggle: () => set((state: any) => state.type === "login" ? { type: "register" } : { type: "login" }),
}))

function Login(props: PaperProps) {
  const type = useTypeStore((state: any) => state.type)
  const toggle = useTypeStore((state: any) => state.toggle)
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <Paper radius="md" {...props}>
      <p className='text-glow text-2xl font-bold mb-8'>
        Welcome to SupaTerms
      </p>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => { })}>
        <Stack>

          <TextInput
            required
            label="Email"
            placeholder="me@email.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
          />

        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} >
            <Center inline>
              <Box ml={5}>Forgot password?</Box>
            </Center>
          </Anchor>
          <Button type="submit" radius="xl">
            Login
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

export function AuthenticationForm(props: PaperProps) {
  const type = useTypeStore((state: any) => state.type);

  return type === "login" ? (
    <Login />
  ) : (
    <ForgotPassword />
  )
}