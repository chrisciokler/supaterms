import { Button, Group, Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import api from 'apis';
import { SecondaryTitle } from 'components/typography/Title';
import { notificationSignal } from 'hooks/useNotification';
import { $prompts, $auth, $assistants, updateAssistant, updatePrompt, DEFAULT_ASSISTANT } from 'store';
import { useLoading } from './useLoading';
import { Session } from '@supabase/supabase-js';

const checkIfAssitantExists = (id: string, context: string) => {
  const exists = $assistants.value.some((i) => i.copiedfrom === id);
  const equals = $assistants.value.some((i) => i.copiedfrom === id && i.context === context);
  return { exists, equals };
};

const checkIfPromptExists = (id: string, context: string) => {
  const exists = $prompts.value.some((i) => i.copiedfrom === id);
  const equals = $prompts.value.some((i) => i.copiedfrom === id && i.context === context);
  return { exists, equals };
};

const cloneProcess = async (id: string, type: 'prompt' | 'assistant') => {
  const session = $auth.value as Session;

  if (type === 'prompt') {
    const data = await api.prompts.CLONE(id);

    if (data) {
      const prompts = await api.prompts.GETBYUSERID(session.user.id);
      if (prompts) $prompts.value = prompts;
      notificationSignal({ title: 'Success', type: 'success', message: `The prompt "${data.name}" was cloned. Check your prompts` });
    } else {
      notificationSignal({
        title: 'Ups',
        type: 'error',
        autoClose: 4000,
        message: `Some kind of error happened during your request. Please try again. If the error persist you can reported in our feedback wiget placed in top`
      });
    }
  } else {
    const data = await api.assistants.CLONE(id);
    if (data) {
      const assistants = await api.assistants.GETBYUSERID(session.user.id);
      if (assistants) $assistants.value = [DEFAULT_ASSISTANT, ...assistants];
      notificationSignal({ title: 'Success', type: 'success', message: `The assistant "${data.name}" was cloned. Check your assistants` });
    } else {
      notificationSignal({
        title: 'Ups',
        type: 'error',
        autoClose: 4000,
        message: `Some kind of error happened during your request. Please try again. If the error persist you can reported in our feedback wiget placed in top`
      });
    }
  }

  modals.closeAll();
};

const NoticeAlert = (props: { id: string; context: string; type: 'prompt' | 'assistant' }) => {
  const newcloneloading = useLoading();
  const updatecloneloading = useLoading();

  const handleCloneAssistant = async () => {
    const newassistant = $assistants.value.filter((i) => i.copiedfrom === props.id)[0];
    await updateAssistant({ ...newassistant, copiedfrom: null });
    await cloneProcess(props.id, 'assistant');
  };

  const handleUpdateAssistant = async () => {
    const newassistant = $assistants.value.filter((i) => i.copiedfrom === props.id)[0];
    await updateAssistant({ ...newassistant, context: props.context });
    notificationSignal({
      title: 'Success',
      type: 'success',
      message: `The assistant "${newassistant.name}" has been updated. Check your assistants`
    });
    modals.closeAll();
  };

  const handleClonePrompt = async () => {
    const newprompt = $prompts.value.filter((i) => i.copiedfrom === props.id)[0];
    await updatePrompt({ ...newprompt, copiedfrom: null });
    await cloneProcess(props.id, 'prompt');
  };

  const handleUpdatePrompt = async () => {
    const newprompt = $prompts.value.filter((i) => i.copiedfrom === props.id)[0];
    await updatePrompt({ ...newprompt, context: props.context });
    notificationSignal({ title: 'Success', type: 'success', message: `The prompt "${newprompt.name}" has been updated. Check your prompts` });
    modals.closeAll();
  };

  const handleClone = async () => {
    newcloneloading.startLoading();
    if (props.type === 'assistant') await handleCloneAssistant();
    else await handleClonePrompt();
    newcloneloading.endLoading();
  };

  const handleUpdate = async () => {
    updatecloneloading.startLoading();
    if (props.type === 'assistant') await handleUpdateAssistant();
    else await handleUpdatePrompt();
    updatecloneloading.endLoading();
  };

  return (
    <Stack>
      <SecondaryTitle>{`You already own a clone of this ${props.type}, but it looks it has been updated since.`}</SecondaryTitle>

      <SecondaryTitle>Do you want to update yours or add a new clone?</SecondaryTitle>

      <Group position="right" mt="xl">
        <Button variant="default" disabled={newcloneloading.loading || updatecloneloading.loading} onClick={() => modals.closeAll()}>
          Cancel
        </Button>
        <Button
          variant="filled"
          loading={newcloneloading.loading}
          disabled={newcloneloading.loading || updatecloneloading.loading}
          onClick={handleClone}
        >
          New clone
        </Button>
        <Button
          variant="filled"
          loading={updatecloneloading.loading}
          disabled={newcloneloading.loading || updatecloneloading.loading}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Group>
    </Stack>
  );
};

export const clonePrompt = async (id: string, context: string) => {
  const user = $auth.value?.user;

  if (!user) {
    notificationSignal({
      title: 'Sorry',
      type: 'info',
      autoClose: 4000,
      message: `You must be authenticated to clone this Prompt`
    });
  } else {
    const { exists, equals } = checkIfPromptExists(id, context);

    if (exists && equals) {
      notificationSignal({
        title: 'Check your prompts',
        type: 'info',
        autoClose: 4000,
        message: `You already own a clone of this prompt`
      });
    } else if (exists && !equals) {
      modals.open({
        title: 'Notice',
        centered: true,
        children: <NoticeAlert id={id} context={context} type="prompt" />
      });
    } else {
      await cloneProcess(id, 'prompt');
    }
  }
};

export const cloneAssistant = async (id: string, context: string) => {
  const user = $auth.value?.user;

  if (!user) {
    notificationSignal({
      title: 'Sorry',
      type: 'info',
      autoClose: 4000,
      message: `You must be authenticated to clone this Assistant`
    });
  } else {
    const { exists, equals } = checkIfAssitantExists(id, context);

    if (exists && equals) {
      notificationSignal({
        title: 'Check your assistants',
        type: 'info',
        autoClose: 4000,
        message: `You already own a clone of this assistant`
      });
    } else if (exists && !equals) {
      modals.open({
        title: 'Notice',
        centered: true,
        children: <NoticeAlert id={id} context={context} type="assistant" />
      });
    } else {
      await cloneProcess(id, 'assistant');
    }
  }
};

export const useClone = () => {
  return { clonePrompt, cloneAssistant };
};
