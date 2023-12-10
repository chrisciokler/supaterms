import { Title, Text, Button, Center } from '@mantine/core'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">

      <section className='flex flex-col min-h-screen items-center justify-center'>
        <h1 className='text-[90px] md:text-5xl font-extrabold'>SupaTerms</h1>
        <p className='text-xl md:text-md text-center mt-1 md:mt-4'>Generate free legal docs with the help of AI in seconds</p>
        <Button variant="filled" mt="lg">Start now</Button>
      </section>

    </main >
  )
}
