import { Badge, Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { AssistantForm } from 'components/forms/AssistantForm';
import { $currentassistant } from 'store';

export const useAssistantModal = () => {
  const update = () => {
    modals.closeAll();
    modals.open({
      zIndex: 9999999999999,
      id: 'assistant-form',
      title: (
        <Group>
          <Badge>Assistant</Badge>
          <Text>{$currentassistant.value.name}</Text>
        </Group>
      ),
      centered: true,
      children: <AssistantForm data={$currentassistant.value} />
    });
  };

  const createNew = () => {
    modals.closeAll();
    modals.open({
      zIndex: 9999999999999,
      id: 'assistant-form',
      title: (
        <Group>
          <Badge>Assistant</Badge>
          <Text>Create new assistant</Text>
        </Group>
      ),
      centered: true,
      children: <AssistantForm />
    });
  };

  return { update, createNew };
};
