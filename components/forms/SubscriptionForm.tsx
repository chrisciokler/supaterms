"use client"
import { Button, TextInput } from '@mantine/core'
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { IconAt } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { api } from '@/apis';

export const SubscriptionForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: { email: '' },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email')
    }
  });

  const submitHandler = async () => {
    setLoading(true);
    const { email } = form.values;
    const response = await api.db.subscribe(email);
    if (!response) successNotification();
    if (response) errorNotification()
    setLoading(false);
  }

  const successNotification = () => {
    notifications.show({
      color: "green",
      title: 'Great!!',
      message: 'Subscription successful.',
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
    <form onSubmit={form.onSubmit(() => submitHandler())}>
      <TextInput
        mt="xl"
        required
        className='w-full max-w-[350px] md:max-w-[280px]'
        placeholder="Email"
        {...form.getInputProps('email')}
        leftSection={<IconAt size={18} />}
        rightSectionWidth={90}
        rightSection={<Button type="submit" size='xs' variant="filled" loading={loading} disabled={loading}>Subscribe</Button>}
      />
    </form>
  )

}