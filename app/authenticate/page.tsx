import { AuthenticationForm } from '@/components/AuthenticationForm';
import { Title, Text, Button, Center, TextInput, PasswordInput } from '@mantine/core'
import { IconAt, IconBrandGoogle } from "@tabler/icons-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">

      <section className='flex flex-col min-h-screen items-center justify-center w-full'>
        <div className='flex flex-col w-full mt-12 gap-2 max-w-[350px] md:max-w-[280px]'>
          <AuthenticationForm />
        </div>
      </section>


    </main >
  )
}
