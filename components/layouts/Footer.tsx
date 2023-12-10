import Link from 'next/link';
import { Group } from '@mantine/core';

export const Footer = () => {
  return (
    <footer className='flex w-full flex-col items-center justify-center border-t border-dark-700 bg-background px-4 py-8 sm:py-6'>
      {/* <Group
        className='w-full sm:hidden'
        align='center'
        gap='sm'
      >
        <Link href='/privacy'>
          <p className='font-semibold'>
            <small>Privacy Policy</small>
          </p>
        </Link>

        <Link href='/terms'>
          <p className='font-semibold'>
            <small>Terms of Use</small>
          </p>
        </Link>
      </Group> */}

      <Group
        className='w-full max-w-[70rem]'
        align='center'
        justify='space-between'
      >
        <p className='font-semibold'>
          <small>&copy; 2023 SupaTerms</small>
        </p>

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


      </Group>
    </footer>
  );
};
