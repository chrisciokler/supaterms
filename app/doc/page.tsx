import { CreateDocButton } from '@/components/CreateDocButton';
import { ListDocs } from '@/components/ListDocs';
import { ReadDocComponent } from '@/components/ReadDocComponent';
import { Steps } from '@/components/Steps';
import { DocCard, DocCardProps } from '@/components/cards/DocCard';
import { Title, Text, Button, Center, TextInput, Group, Card, Badge, SimpleGrid, Stack } from '@mantine/core'
import { IconAt } from "@tabler/icons-react";


export default function Doc() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center px-16 md:py-2 md:px-4">
      <ReadDocComponent />
    </main >
  )
}
