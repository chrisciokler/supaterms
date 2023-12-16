"use client"
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
import { useState } from 'react';
import { api } from '@/apis';
import { notifications } from '@mantine/notifications';
import { Catpcha } from './Catpcha';
import { useDidUpdate } from '@mantine/hooks';

type InitialValues = {
  email: string;
  password: string;
};

const initialValues: InitialValues = {
  email: '',
  password: ''
};

export function ForgotPassword() {
  const toggle = useTypeStore((state: any) => state.toggle)
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues,

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email')
    }
  });

  const submitHandler = async () => {
    setLoading(true);
    const { email } = form.values;
    const response = await api.auth.sendPasswordRecoveryEmail(email);
    if (response) successNotification();
    if (!response) errorNotification()
    setLoading(false);
  };

  const successNotification = () => {
    notifications.show({
      color: "green",
      title: 'Success!!',
      message: 'You will receive an email with a link to reset your password.',
    })
  }

  const errorNotification = () => {
    notifications.show({
      color: "red",
      title: 'Failure!!',
      message: 'Something went wrong. Please try again.',
    })
  }

  return (
    <Container className='w-full' p={0}>
      <p className='text-glow text-2xl font-bold mb-8'>
        Forgot password?
      </p>

      <form onSubmit={form.onSubmit(() => submitHandler())}>
        <Paper mt="xl" className='w-full'>
          <TextInput
            label="Your email"
            description="Enter your email to get a reset link"
            placeholder="me@email.com"
            required
            disabled={loading}
            {...form.getInputProps('email')}
            classNames={{ label: 'capitalize' }}
          />

          <div className="w-full items-center justify-center">
            <Catpcha
              onError={() => console.log('error')}
              onVerify={() => setVerify(true)}
              onLoad={() => console.log('load')}
              onExpire={() => console.log('expired')}
            />
          </div>

          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor c="dimmed" size="sm" className={classes.control} onClick={toggle}>
              <Center inline>
                <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                <Box ml={5}>Back to the login page</Box>
              </Center>
            </Anchor>
            <Button className={classes.control} type="submit" loading={loading} disabled={loading || !verify}>Reset</Button>
          </Group>
        </Paper>
      </form>
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
  const toggle = useTypeStore((state: any) => state.toggle)
  const [verify, setVerify] = useState(false);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues,

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters.' : null)
    }
  });

  const submitHandler = async () => {
    setLoading(true);
    const { email, password } = form.values;

    const exists = await api.auth.checkIfEmailExists(email);
    if (exists) {
      const data = await api.auth.signInWithEmail({ email, password });
      if (!data) errorNotification();
      if (data && exists) successNotification('You have successfully signed in');
    } else {
      if (!exists) setActive(true);
    }

    setLoading(false);
  };

  const signUpAfterCaptcha = async () => {
    setLoading(true);
    const { email, password } = form.values;
    const data = await api.auth.signUpWithEmail({ email, password });
    if (!data) errorNotification();
    if (data) successNotification('Thanks for Signing Up. You will receive an email with a link to verify your account.');
    setLoading(false);
  };

  const successNotification = (message: string) => {
    notifications.show({
      color: "green",
      title: 'Success!!',
      message,
    })
  }

  const errorNotification = () => {
    notifications.show({
      color: "red",
      title: 'Failure!!',
      message: 'Something went wrong. Please try again.',
    })
  }

  const continueWithGoogle = async () => {
    api.auth.signInWithGoogle();
  };

  useDidUpdate(() => {
    if (verify) signUpAfterCaptcha();
  }, [verify]);

  return (
    <Paper radius="md" {...props}>
      <p className='text-glow text-2xl font-bold mb-8'>
        Welcome to SupaTerms
      </p>

      <Group grow mb="md" mt="md">
        <GoogleButton onClick={continueWithGoogle}>Google</GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => submitHandler())}>
        <Stack>

          <TextInput
            required
            label="Email"
            placeholder="me@email.com"
            {...form.getInputProps('email')}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            {...form.getInputProps('password')}
          />

          {active && (
            <div className="w-full items-center justify-center">
              <Catpcha
                onError={() => {
                  setLoading(false);
                  setActive(false);
                  setVerify(false);
                  errorNotification();
                }}
                onVerify={() => setVerify(true)}
                onLoad={() => setLoading(true)}
                onExpire={() => console.log('expired')}
              />
            </div>
          )}

        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} >
            <Center inline>
              <Box ml={5}>Forgot password?</Box>
            </Center>
          </Anchor>
          <Button type="submit">
            Login
          </Button>
        </Group>

        <Center mt="xl">
          <Text c="dimmed" size='xs'>By signing in, you agree to our Terms of Service and Privacy Policy.</Text>
        </Center>
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