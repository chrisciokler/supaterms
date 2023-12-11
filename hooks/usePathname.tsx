import { useRouter } from 'next/router';

type Pathname = '/' | '/assistants' | 'search' | '/dashboard' | '/invites';
export const usePathname = () => {
  const router = useRouter();
  return router.pathname as Pathname;
};
