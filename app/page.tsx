import { Steps } from '@/components/Steps';
import { SubscriptionForm } from '@/components/forms/SubscriptionForm';
import { Title, Text, Button, Center, TextInput, Anchor } from '@mantine/core'
import { IconAt } from "@tabler/icons-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">

      <section className='flex flex-col min-h-screen items-center justify-center'>
        <h1 className='text-[60px] text-glow max-w-[750px] md:max-w-[280px] md:text-5xl font-extrabold text-center'>Generate legal docs with AI in seconds.</h1>
        <Button variant="filled" mt="lg" className='shadow-xl shadow-gray-800'
          style={{ boxShadow: '0 0 150px 48px rgba(75,0,130,0.5)' }}>Start now - it is free</Button>
        <div>
          <Text size='xs' mt="sm" c="violet">Powered by <Anchor underline='always' href='https://supabase.com' target='_blank'>Supabase</Anchor> & <Anchor underline='always' href='https://openai.com' target='_blank'>OpenAI</Anchor></Text>
        </div>
      </section>

      <section className='flex flex-col min-h-screen items-center justify-center'>
        <h2 className='text-[60px] md:text-4xl font-extrabold text-glow mb-8 text-center'>How SupaTerms works?</h2>
        <Steps />
      </section>

      <section className='flex flex-col w-full min-h-screen items-center justify-center'>
        <h2 className='text-[60px] md:text-4xl font-extrabold text-glow'>Stay in the loop</h2>
        <p className='text-lg max-w-[500px] md:text-sm text-center mt-1 md:mt-4'>{`Don't miss out on my future free projects! Enter your email address below to receive updates straight to your inbox. No spam, just timely notifications about my free open-source releases!`}</p>
        <SubscriptionForm />
      </section>

    </main >
  )
}
