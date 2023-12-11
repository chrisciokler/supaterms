import { Badge, Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { PromptUpdate } from 'apis/prompts';
import { PromptForm } from 'components/forms/PromptForm';
import { $currentassistant } from 'store';

export const usePromptModal = () => {
  const createNew = (data?: PromptUpdate) => {
    modals.closeAll();
    modals.open({
      zIndex: 9999999999999,
      title: (
        <Group>
          <Badge color="orange">Prompt</Badge>
          <Text>Create new prompt</Text>
        </Group>
      ),
      centered: true,
      children: <PromptForm {...data} assistant_id={$currentassistant.value.id === '1' ? null : $currentassistant.value.id} />
    });
  };

  const update = (data?: PromptUpdate) => {
    modals.closeAll();
    modals.open({
      zIndex: 9999999999999,

      title: (
        <Group>
          <Badge color="orange">Prompt</Badge>
          <Text>Edit prompt</Text>
        </Group>
      ),
      centered: true,
      children: <PromptForm {...data} />
    });
  };

  return { createNew, update };
};
