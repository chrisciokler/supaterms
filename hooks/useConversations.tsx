import { signal } from '@preact/signals-react';
import { useQuery } from '@tanstack/react-query';
import api from 'apis';
import { ConversationProps } from 'apis/conversations';
import { getLocalStorageConversations, localStorageConversations } from 'lib/app/localstorage';
import { $auth, $currentassistant } from 'store';

export const $conversations = signal<ConversationProps[]>([]);
export const setConversations = (conversations: ConversationProps[]) => {
  $conversations.value = conversations;
  localStorageConversations(conversations);
};

const USECONVERSATIONTRIGGER = signal(false);
export const triggerUseConversations = () => (USECONVERSATIONTRIGGER.value = !USECONVERSATIONTRIGGER.value);
export const useConversations = () => {
  const getConversations = async () => {
    const user_id = $auth.value?.user.id;
    if (user_id) {
      const assistant_id = $currentassistant.value.id;
      const localassistants = getLocalStorageConversations();
      if (assistant_id === '1') $conversations.value = localassistants;
      else $conversations.value = localassistants.filter((i) => i.assistant_id === assistant_id);
      const data = await api.conversations.MY(user_id, assistant_id);
      if (data) {
        if (assistant_id === '1') setConversations(data);
        else $conversations.value = data;
      }
      return data;
    }

    return null;
  };

  const data = useQuery({
    queryKey: ['conversations', $currentassistant.value, USECONVERSATIONTRIGGER.value, $auth.value],
    queryFn: getConversations,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  });

  const removeItem = (id: string) => {
    const filtered = $conversations.value.filter((i) => i.id !== id);
    setConversations(filtered);
  };

  return { conversations: $conversations.value, removeItem, ...data };
};
