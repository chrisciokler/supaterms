"use client"
import { api } from '@/apis';
import { Anchor, Box, Button, Center, Divider, Group, PasswordInput, SegmentedControl, Stack, Tabs, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from '@preact-signals/safe-react/react';
import { useAuthStore } from '../layouts/AppInitializer';

export const AccountForm = () => {
  const userid = useAuthStore(state => state.auth?.user.id);
  const credentials = useAuthStore(state => ({ org: state.openaiorg || "", token: state.openaitoken || "" }));
  const [value, setValue] = useState('openai');
  const [loading, setLoading] = useState(false);
  const resetform = useForm({
    initialValues: { password: "" },

    validate: {
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters.' : null)
    }
  });

  const credentialsform = useForm({
    initialValues: { ...credentials },
  });

  useEffect(() => {
    credentialsform.setValues({ ...credentials })
  }, [userid])

  const resetPasswordHandler = async () => {
    setLoading(true);
    try {
      const { password } = resetform.values;
      console.log('🚀 | file: AccountForm.tsx:31 | resetPasswordHandler | password:', password)
      const data = await api.auth.setNewPassword(password);
      console.log('🚀 | file: AccountForm.tsx:32 | resetPasswordHandler | data:', data)
      if (!data) errorNotification();
      if (data) successNotification('Your password has been reset');
    } catch (error) {
      console.log('🚀 | file: AccountForm.tsx:35 | resetPasswordHandler | error:', error)
    }
    setLoading(false);
  }

  const credentialsHandler = async () => {
    console.log('🚀 | file: AccountForm.tsx:38 | credentialsHandler | true:', true)

    setLoading(true);
    const { org, token } = credentialsform.values;

    let data: any
    if (credentials.org.length > 0 || credentials.token.length > 0) {
      data = await api.db.updateOpenAIToken(userid || "", org, token);
    } else {
      data = await api.db.insertOpenAIToken(org, token);
    }
    if (!data) errorNotification();
    if (data) successNotification('Your OpenAI credentials have been saved');
    setLoading(false);
  }

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

  return (
    <Stack className='w-full max-w-[300px]' gap="xs">
      <h4 className='text-xl font-bold'>chrisciokler@gmail.com</h4>
      <Divider />

      <SegmentedControl
        disabled={loading}
        value={value}
        onChange={(e) => setValue(e)}
        data={[
          { label: 'OpenAI Credentials', value: 'openai' },
          { label: 'Password Reset', value: 'passwordreset' },
        ]}
      />


      {value === "openai" ? (
        <form onSubmit={credentialsform.onSubmit(() => credentialsHandler())}>
          <Stack className='w-full' gap="xs">
            <Text c="dimmed" mt="lg" fw={700}>OpenAI Credentials</Text>
            <TextInput label="Organization"
              required
              placeholder='SupaTermsOrg' description="OpenAI Account organization name"
              {...credentialsform.getInputProps('org')}
            />
            <PasswordInput label="API Key"
              required
              placeholder='sk-ROSPrNoQRsYFDen1kqVhT3BlbdFJxnDt1Gj75me8BEJiSuCb' description="OpenAI Account API Keys"
              {...credentialsform.getInputProps('token')}
            />
            <Group justify='space-between'>
              <Anchor href="https://platform.openai.com/account/org-settings" c="violet" target='_blank' fz="sm"  >
                <Center inline>
                  <Box ml={5}>{`Don't have Credentials?`}</Box>
                </Center>
              </Anchor>

              <Button type='submit' loading={loading} disabled={loading}>Save</Button>
            </Group>
          </Stack>
        </form>
      ) : (
        <form onSubmit={resetform.onSubmit(() => resetPasswordHandler())}>
          <Stack className='w-full' gap="xs">
            <Text c="dimmed" mt="lg" fw={700}>Password reset</Text>
            <PasswordInput
              required
              label="New Password"
              placeholder="Your password"
              {...resetform.getInputProps('password')}
            />
            <Group justify='flex-end'>

              <Button type='submit' loading={loading} disabled={loading}>Reset</Button>
            </Group>
          </Stack>
        </form>
      )}
    </Stack >
  )
} 