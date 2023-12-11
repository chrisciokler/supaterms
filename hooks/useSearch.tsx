import { useDidUpdate, useToggle } from '@mantine/hooks';
import { useSignal } from '@preact/signals-react';
import { useQuery } from '@tanstack/react-query';
import api from 'apis';
import { ListAssistant, PropsQuery } from 'apis/assistants';
import { ListPrompt } from 'apis/prompts';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useSearch = () => {
  const page = useSignal(0);
  const hasNext = useSignal(true);
  const router = useRouter();
  const [assistants, setAssistants] = useState<ListAssistant[] | null>(null);
  const [prompts, setPrompts] = useState<ListPrompt[] | null>(null);
  const [type, toggle] = useToggle<'assistant' | 'prompt'>(['assistant', 'prompt']);
  const [trigger, toggleTrigger] = useToggle([false, true]);

  const getData = async () => {
    try {
      const query = router.query as PropsQuery;
      if (type === 'assistant') {
        let assists: ListAssistant[] = [];
        const astnt = await api.assistants.LIST(query, page.value);
        if (page.value === 0 && astnt.data) assists = astnt.data;
        if (page.value > 0 && astnt.data && assistants) assists = [...assistants, ...astnt.data];
        if (page.value > 0 && !astnt.data && assistants) assists = [...assistants];
        setAssistants(assists);

        const currentassistantcount = assistants?.length || 0;
        const respomseassistantcount = astnt?.count || 0;
        if (currentassistantcount >= respomseassistantcount) hasNext.value = false;
      }

      if (type === 'prompt') {
        let propt: ListPrompt[] = [];
        const pmt = await api.prompts.LIST(query, page.value);
        if (page.value === 0 && pmt.data) propt = pmt.data;
        if (page.value > 0 && pmt.data && prompts) propt = [...prompts, ...pmt.data];
        if (page.value > 0 && !pmt.data && prompts) propt = [...prompts];
        setPrompts(propt);

        const currentpromptcount = prompts?.length || 0;
        const respomsepromptcount = pmt?.count || 0;
        if (currentpromptcount >= respomsepromptcount) hasNext.value = false;
      }
    } catch (error) {
      console.log('🚀 | file: useSearch.tsx:34 | getData | error:', error);
    }

    return [];
  };

  const query = useQuery({
    queryKey: ['search', page.value, trigger],
    queryFn: getData,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false
  });

  const nextPage = () => page.value++;

  useDidUpdate(() => {
    page.value = 0;
    hasNext.value = true;
    toggleTrigger();
  }, [type, router.query]);

  return { type, toggle, page, hasNext: hasNext.value, nextPage, assistants, prompts, ...query };
};
