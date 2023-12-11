import { useDisclosure } from '@mantine/hooks';

export const useLoading = () => {
  const [value, handler] = useDisclosure(false);

  return { loading: value, startLoading: handler.open, endLoading: handler.close };
};
