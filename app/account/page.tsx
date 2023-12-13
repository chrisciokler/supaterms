import { AccountForm } from '@/components/forms/AccountForm';
import { Container } from '@mantine/core';

export default function Terms() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center px-16 md:py-2 md:px-4">


      <div className='flex flex-col w-full mt-24 items-center justify-center'>
        <AccountForm />
      </div>

    </main >
  )
}
