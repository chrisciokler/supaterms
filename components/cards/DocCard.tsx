"use client"
import { Badge, Button, Card, Group, Stack, Text } from '@mantine/core'
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

export type DocCardProps = {
  id: string
  title: string;
  type: "Terms & Conditions" | "Privacy Policy"
}

export const DocCard = (props: DocCardProps) => {
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
    onConfirm: () => {
      notifications.show({
        color: "green",
        title: 'Success!!',
        message: 'Your doc has been deleted successfully',
      })
    }
  });

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack className='w-full' gap="xs">
        <Text fw={500} lineClamp={1}>{props.title}</Text>
        <Badge color={props.type === "Privacy Policy" ? "green" : "violet"} variant='light'>{props.type}</Badge>
        <Group w="100%" justify="flex-end" gap="sm" mt="md">
          <Button variant='default' onClick={openModal}>
            Delete
          </Button>
          <Button>
            Edit
          </Button>
        </Group>
      </Stack>
    </Card>
  )
}