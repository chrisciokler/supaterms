import Link from 'next/link';
import { Group, Text, Anchor } from '@mantine/core';

export const Footer = () => {
  return (
    <footer className='flex w-full flex-col items-center justify-center border-t border-dark-700 bg-background px-4 py-8 sm:py-6'>


      <div
        className='flex md:flex-col-reverse w-full max-w-[70rem] items-center justify-between'
      >
        <p className='font-semibold'>
          <small>&copy; 2023 SupaTerms</small>
        </p>

        <Text size='xs' mt="sm" c="violet">Powered by <Anchor underline='always' href='https://supabase.com' target='_blank'>Supabase</Anchor> & <Anchor underline='always' href='https://openai.com' target='_blank'>OpenAI</Anchor></Text>


        <Group
          align='center'
          gap='sm'
        >
          <Link
            href='https://www.chrisciokler.com'
            target='_blank'
          >
            <p className='font-semibold'>
              <small>Developed by @ChrisCiokler</small>
            </p>
          </Link>
        </Group>


      </div>
    </footer>
  );
};
