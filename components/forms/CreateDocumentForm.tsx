"use client"
import { Button, Group, Radio, Stack, TextInput, Textarea } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useState } from '@preact-signals/safe-react/react';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

export const CreateDocumentForm = () => {
  const [value, setValue] = useState('terms');

  const closeModal = () => modals.closeAll()

  return (
    <Stack className="w-full" gap="xs">
      <TextInput required label="Document title" placeholder='SupaTerms Terms of use' />
      <Textarea label="Description" description='Short description about the document (Optional)' placeholder='Terms of use of Supaterms describing...' />

      <Radio.Group
        value={value}
        onChange={setValue}
        label="Legal Document type"
        description="Select the legal document you want to generate"
        withAsterisk
      >
        <Group mt="xs">
          <Radio value="terms" label="Terms of Use" />
          <Radio value="privacy" label="Privacy Policy" />
        </Group>
      </Radio.Group>

      <div className='flex w-full items-end gap-4 justify-end mt-4'>
        <Button variant='default'>Cancel</Button>
        <Link href={"/" + value} shallow><Button onClick={closeModal} rightSection={<IconArrowRight size={18} />}>Continue</Button></Link>
      </div>
    </Stack>
  )
}