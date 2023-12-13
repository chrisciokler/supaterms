"use client"
import { Button, ButtonProps, Group, Radio, Stack, TextInput, Textarea } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { useState } from 'react'
import { CreateDocumentForm } from './forms/CreateDocumentForm'

export const CreateDocButton = () => {
  const [value, setValue] = useState('react');


  const open = () => {
    modals.open({
      title: 'Create Document',
      children: (
        <CreateDocumentForm />
      )
    })
  }

  return (
    <Button variant='default' mt="xs" onClick={open}>Create new doc</Button>

  )
}