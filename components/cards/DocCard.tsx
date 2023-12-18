"use client"
import { api } from '@/apis';
import { Badge, Button, Card, Group, Stack, Text } from '@mantine/core'
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useState } from '@preact-signals/safe-react/react';
import { useDocs } from '../ListDocs';
import Link from 'next/link';

export type DocCardProps = {
  id: string
  title: string;
  type: "terms" | "privacy"
}

export const DocCard = (props: DocCardProps) => {
  const { docs, setDocs } = useDocs(state => state)

  const openModal = () => modals.openConfirmModal({
    title: 'Want to delete this doc?',
    children: (
      <Text size="sm">
        Please confirm your action, there is not turning back. Please click
        one of these buttons to proceed.
      </Text>
    ),
    confirmProps: {
      color: "red"
    },
    centered: true,
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel'),
    onConfirm: async () => {
      await api.db.deleteDoc(props.id);
      const newdocs = docs.filter(i => i.id !== props.id)
      setDocs(newdocs)
      notifications.show({
        color: "green",
        title: 'Success!!',
        message: 'Your doc has been deleted successfully',
      })
    }
  });

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w="100%">
      <Stack className='w-full' gap="xs">
        <Text fw={500} lineClamp={1}>{props.title}</Text>
        <Badge color={props.type === "privacy" ? "green" : "violet"} variant='light'>{props.type}</Badge>
        <Group w="100%" justify="flex-end" gap="sm" mt="md">
          <Button variant='default' onClick={openModal}>
            Delete
          </Button>
          <Link href={`/doc?id=${props.id}`}>
            <Button>
              Read
            </Button>
          </Link>
        </Group>
      </Stack>
    </Card>
  )
}