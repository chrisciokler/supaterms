"use client"
import { Anchor, Box, Button, Center, Divider, Group, PasswordInput, SegmentedControl, Stack, Tabs, Text, TextInput } from '@mantine/core'
import { useState } from '@preact-signals/safe-react/react';
import { IconBrandOpenai, IconLock } from '@tabler/icons-react'

export const AccountForm = () => {
  const [value, setValue] = useState('openai');

  return (
    <Stack className='w-full max-w-[300px]' gap="xs">
      <h4 className='text-xl font-bold'>chrisciokler@gmail.com</h4>
      <Divider />

      <SegmentedControl
        value={value}
        onChange={(e) => setValue(e)}
        data={[
          { label: 'OpenAI Credentials', value: 'openai' },
          { label: 'Password Reset', value: 'passwordreset' },
        ]}
      />


      {value === "openai" ? <Stack className='w-full' gap="xs">
        <Text c="dimmed" mt="lg" fw={700}>OpenAI Credentials</Text>
        <TextInput label="Organization"
          required
          placeholder='SupaTermsOrg' description="OpenAI Account organization name" />
        <PasswordInput label="API Key"
          required
          placeholder='sk-ROSPrNoQRsYFDen1kqVhT3BlbdFJxnDt1Gj75me8BEJiSuCb' description="OpenAI Account API Keys" />
        <Group justify='space-between'>
          <Anchor href="https://platform.openai.com/account/org-settings" c="violet" target='_blank' fz="sm"  >
            <Center inline>
              <Box ml={5}>{`Don't have Credentials?`}</Box>
            </Center>
          </Anchor>

          <Button>Save</Button>
        </Group>
      </Stack>
        : <Stack className='w-full' gap="xs">
          <Text c="dimmed" mt="lg" fw={700}>Password reset</Text>
          <PasswordInput
            required
            label="New Password"
            placeholder="Your password"
          />
          <Group justify='flex-end'>

            <Button>Reset</Button>
          </Group>
        </Stack>}
    </Stack >
  )
} 