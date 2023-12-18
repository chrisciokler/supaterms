"use client"
import { api } from '@/apis';
import { Button, Group, Radio, Stack, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useState } from '@preact-signals/safe-react/react';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type InitialValues = {
  title: string
  description: string
  type: 'terms' | 'privacy'

}
export const CreateDocumentForm = () => {
  const [loading, toggle] = useToggle([false, true])
  const router = useRouter()
  const form = useForm<InitialValues>({
    initialValues: {
      title: '',
      description: '',
      type: 'terms'
    }
  })

  const formHandler = async () => {
    toggle(true)
    const { title, description, type } = form.values
    const data = await api.db.insertDoc({ title, description, type });
    if (data) {
      router.push(`/${data?.type}?id=${data?.id}`)
    } else {
      errorNotification()
    }
    toggle(false)
    closeModal()
  }

  const errorNotification = () => {
    notifications.show({
      color: "red",
      title: 'Failure!!',
      message: 'Something went wrong. Please try again.',
    })
  }

  const closeModal = () => modals.closeAll()

  return (
    <form onSubmit={form.onSubmit(() => formHandler())}>
      <Stack className="w-full" gap="xs">
        <TextInput required label="Document title" placeholder='SupaTerms Terms of use' {...form.getInputProps("title")} />
        <Textarea label="Description" description='Short description about the document (Optional)' placeholder='Terms of use of Supaterms describing...' {...form.getInputProps("description")} />

        <Radio.Group
          label="Legal Document type"
          description="Select the legal document you want to generate"
          {...form.getInputProps("type")}
          withAsterisk
        >
          <Group mt="xs">
            <Radio value="terms" label="Terms of Use" />
            <Radio value="privacy" label="Privacy Policy" />
          </Group>
        </Radio.Group>

        <div className='flex w-full items-end gap-4 justify-end mt-4'>
          <Button variant='default' onClick={closeModal} disabled={loading}>Cancel</Button>
          <Button type="submit" rightSection={<IconArrowRight size={18} />} loading={loading} disabled={loading}>Continue</Button>
        </div>
      </Stack>
    </form>
  )
}