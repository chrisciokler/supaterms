"use client"
import { termsPolicyAssistant, termsPolicyTemplate } from '@/lib/termstemplate';
import { Title, Text, Button, Center, TagsInput, TextInput, Group, Card, Badge, SimpleGrid, Stack, Checkbox, Radio, Select, Space, MultiSelect, ActionIcon } from '@mantine/core'
import { useForm } from '@mantine/form';
import { IconArrowLeft, IconAt } from "@tabler/icons-react";
import { useState, useRef, useCallback } from "react";
import { PhoneInput } from './PhoneInput';
import { countries } from '@/constants';
import { useRouter } from 'next/navigation';
import { useDocGenerator } from '@/hooks/useDocGenerator';

type Platform = 'website' | 'app';

export type TermsProps = {
  platform: Platform[];
  url: string;
  websitename: string;
  appname: string;
  entity: 'business' | 'individual';
  businessname: string;
  businessaddress: string;
  country: string;
  contactbyemail: { active: boolean; value: string };
  contactbywebsite: { active: boolean; value: string };
  contactbyphone: { active: boolean; value: string };
  contactbypostmail: { active: boolean; value: string };
  createaccounts: 'Yes' | 'No';
  sendemails: 'Yes' | 'No';
  uploadcontent: 'Yes' | 'No';
  buygoods: 'Yes' | 'No';
  subscriptions: 'Yes' | 'No';
  refunds: 'Yes' | 'No';
  refundschanges: 'Yes' | 'No';
  refundstime: string;
  refundsconditions: string[];
  freetrials: 'Yes' | 'No';
  freeplan: 'Yes' | 'No';
  rights: 'Yes' | 'No';
  feedbackcompensation: 'Yes' | 'No';
  promotions: 'Yes' | 'No';
  minors: 'Yes' | 'No';
};

const initialValues: TermsProps = {
  platform: [],
  url: '',
  websitename: '',
  appname: '',
  country: '',
  entity: 'business',
  businessname: '',
  businessaddress: '',
  contactbyemail: {
    active: false,
    value: ''
  },
  contactbywebsite: {
    active: false,
    value: ''
  },
  contactbyphone: {
    active: false,
    value: ''
  },
  contactbypostmail: {
    active: false,
    value: ''
  },
  createaccounts: 'Yes',
  sendemails: 'Yes',
  uploadcontent: 'Yes',
  buygoods: 'Yes',
  subscriptions: 'Yes',
  rights: 'Yes',
  feedbackcompensation: 'Yes',
  promotions: 'Yes',
  freetrials: 'No',
  freeplan: 'No',
  minors: 'No',
  refunds: 'No',
  refundstime: '',
  refundschanges: 'No',
  refundsconditions: []
};

const refundsdata = [
  { label: 'Product must be returned in its original packaging', value: 'Product must be returned in its original packaging' },
  { label: `Product isn't used or damaged`, value: `Product isn't used or damaged` },
  { label: 'Product must have the receipt or proof of purchase', value: 'Product must have the receipt or proof of purchase' }
];

const BacktoDocsButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back()
  }

  return (
    <ActionIcon onClick={goBack} variant='default' mr="md">
      <IconArrowLeft size={18} />
    </ActionIcon>
  )
}

export function TermsOfUseGenerator() {
  const stopConversationRef = useRef<boolean>(false);
  const form = useForm({ initialValues });
  const { generate, isLoading } = useDocGenerator()
  const [refunds, setRefunds] = useState(refundsdata);
  const [istyping, setIsTyping] = useState(false);

  const typing = (value: boolean) => {
    setIsTyping(value);
  };

  const handleStopConversation = () => {
    stopConversationRef.current = true;
    setTimeout(() => {
      stopConversationRef.current = false;
    }, 1000);
  };

  const handleSubmit = useCallback(
    async (user: string) => {
      const system = termsPolicyAssistant;

      await generate(system, user)

      // try {
      //   const controller = new AbortController();
      //   const response = await api.ai.AUTOCOMPLETION16K({ user, system }, controller);

      //   if (!response.ok) {
      //     toggle(false);
      //     return;
      //   }

      //   const data = response.body;

      //   if (!data) {
      //     toggle(false);
      //     return;
      //   }

      //   toggle(false);

      //   const reader = data.getReader();
      //   const decoder = new TextDecoder();
      //   let done = false;
      //   let startText = '';
      //   let didHandleHeader = false;

      //   typing(true);

      //   while (!done) {
      //     if (stopConversationRef.current === true) {
      //       controller.abort();
      //       done = true;
      //       break;
      //     }

      //     const { value, done: doneReading } = await reader.read();
      //     done = doneReading;
      //     const chunkValue = decoder.decode(value);
      //     if (!didHandleHeader) {
      //       startText = startText + chunkValue;
      //       if (startText.includes(STREAM_SEPARATOR)) {
      //         const parts = startText.split(STREAM_SEPARATOR);

      //         content = content + parts[1];
      //         textResponse.value = content;
      //         didHandleHeader = true;
      //       }
      //     } else {
      //       content = content + chunkValue;
      //       textResponse.value = content;
      //     }
      //   }
      // } catch (e) {
      //   console.error('Error', e);
      // }

      // toggle(false);
      // typing(false);
    },
    [form.values]
  );

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(termsPolicyTemplate(values)))}>
      <Stack className='w-full h-full max-w-[450px]'>
        <Group>
          <h1 className='text-[30px] text-glow max-w-[750px] md:max-w-[280px] md:text-3xl font-extrabold '><BacktoDocsButton /> SupaTerms Terms of Use Policy</h1>
        </Group>

        <Checkbox.Group
          size="md"
          label="Where will your Privacy Policy be used?"
          description="Select one or many"
          withAsterisk
          required
          {...form.getInputProps('platform')}
        >
          <Group mt="xs">
            <Checkbox label="Website" value="website" />
            <Checkbox label="App" value="app" />
          </Group>
        </Checkbox.Group>

        {form.values.platform.includes('website') && (
          <TextInput
            label="What is your website URL?"
            required
            type="url"
            placeholder="https://supaterms.com"
            {...form.getInputProps('url')}
          />
        )}
        {form.values.platform.includes('website') && (
          <TextInput label="What is your website name?" required placeholder="Supaterms" {...form.getInputProps('websitename')} />
        )}
        {form.values.platform.includes('app') && (
          <TextInput label="What is your app name?" required placeholder="Supaterms" {...form.getInputProps('appname')} />
        )}

        <Radio.Group
          size="md"
          required
          label="Entity type"
          description="You are a business or individual?"
          withAsterisk
          {...form.getInputProps('entity')}
        >
          <Group mt="xs">
            <Radio value="business" label="Business" />
            <Radio value="individual" label="Individual" />
          </Group>
        </Radio.Group>

        {form.values.entity === 'business' && (
          <TextInput label="What is your business name" required placeholder="Supaterms LLC" {...form.getInputProps('businessname')} />
        )}

        {form.values.entity === 'business' && (
          <TextInput
            label="What is your business address?"
            required
            placeholder="123 Main Street, Anytown, California, 12345"
            {...form.getInputProps('businessaddress')}
          />
        )}

        <Select
          searchable
          required
          label="Country"
          placeholder="Select a country"
          data={countries.map(({ name }) => ({ label: name, value: name }))}
          {...form.getInputProps('country')}
        />

        <Radio.Group size="md" label="Can users create accounts?" withAsterisk {...form.getInputProps('createaccounts')}>
          <Group mt="xs">
            <Radio value="Yes" label="Yes" />
            <Radio value="No" label="No" />
          </Group>
        </Radio.Group>

        <Radio.Group
          size="md"
          label="Can users create and/or upload content (i.e. text, images)?"
          withAsterisk
          {...form.getInputProps('uploadcontent')}
        >
          <Group mt="xs">
            <Radio value="Yes" label="Yes" />
            <Radio value="No" label="No" />
          </Group>
        </Radio.Group>

        <Radio.Group size="md" label="Can users buy goods (products, items)?" withAsterisk {...form.getInputProps('buygoods')}>
          <Group mt="xs">
            <Radio value="Yes" label="Yes" />
            <Radio value="No" label="No" />
          </Group>
        </Radio.Group>

        <Radio.Group size="md" label="Do you offer subscription plans?" withAsterisk {...form.getInputProps('subscriptions')}>
          <Group mt="xs">
            <Radio value="Yes" label="Yes" />
            <Radio value="No" label="No" />
          </Group>
        </Radio.Group>

        {(form.values.subscriptions === 'Yes' || form.values.buygoods === 'Yes') && (
          <Radio.Group size="md" label="Do you offer refunds?" withAsterisk {...form.getInputProps('refunds')}>
            <Group mt="xs">
              <Radio value="Yes" label="Yes" />
              <Radio value="No" label="No" />
            </Group>
          </Radio.Group>
        )}

        {form.values.refunds === 'Yes' && (
          <Select
            label="How many days customers have to ask for a refund?"
            description="Please note that you need to select a minimum of 14 days for EU-based businesses."
            required
            placeholder="14 days"
            data={[
              { label: '14 days', value: '14 days' },
              { label: '30 days', value: '30 days' },
              { label: '6 months', value: '6 months' },
              { label: '1 year', value: '1 year' },
              { label: 'lifetime', value: 'lifetime' }
            ]}
            {...form.getInputProps('refundstime')}
          />
        )}

        {form.values.refunds === 'Yes' && (
          <Radio.Group size="md" label="Can customers exchange a product with a new one?" withAsterisk {...form.getInputProps('refundschanges')}>
            <Group mt="xs">
              <Radio value="Yes" label="Yes" />
              <Radio value="No" label="No" />
            </Group>
          </Radio.Group>
        )}

        {form.values.refunds === 'Yes' && (
          <TagsInput
            label="What are the conditions that must be met to issue a refund?"
            size="md"
            description="You can add conditions more conditions by typing here"
            required
            clearable
            // getCreateLabel={(query) => `+ Create ${query}`}
            // onCreate={(query) => {
            //   const item = { value: query, label: query };
            //   setRefunds((current) => [...current, item]);
            //   return item;
            // }}
            placeholder="Select conditions"
            data={refunds}
            {...form.getInputProps('refundstime')}
          />
        )}

        {form.values.subscriptions === 'Yes' && (
          <Radio.Group size="md" label="Do you offer free trials?" withAsterisk {...form.getInputProps('freetrials')}>
            <Group mt="xs">
              <Radio value="Yes" label="Yes" />
              <Radio value="No" label="No" />
            </Group>
          </Radio.Group>
        )}

        {form.values.subscriptions === 'Yes' && (
          <Radio.Group size="md" label="Do you offer free plans?" withAsterisk {...form.getInputProps('freeplan')}>
            <Group mt="xs">
              <Radio value="Yes" label="Yes" />
              <Radio value="No" label="No" />
            </Group>
          </Radio.Group>
        )}

        <Radio.Group
          size="md"
          label="Do you want to make it clear that your own content & trademarks are your exclusive property?"
          withAsterisk
          {...form.getInputProps('rights')}
        >
          <Group mt="xs">
            <Radio value="Yes" label="Yes" />
            <Radio value="No" label="No" />
          </Group>
        </Radio.Group>

        <Radio.Group
          size="md"
          label="If users provide you feedback & suggestions, do you want to use this feedback without compensation or credits given?"
          withAsterisk
          {...form.getInputProps('feedbackcompensation')}
        >
          <Group mt="xs">
            <Radio value="Yes" label="Yes" />
            <Radio value="No" label="No" />
          </Group>
        </Radio.Group>

        <Radio.Group size="md" label="Do you plan to offer promotions, contests, sweepstakes?" withAsterisk {...form.getInputProps('promotions')}>
          <Group mt="xs">
            <Radio value="Yes" label="Yes" />
            <Radio value="No" label="No" />
          </Group>
        </Radio.Group>

        <Radio.Group size="md" label="Do you allow minors under 18 years to use the platform?" withAsterisk {...form.getInputProps('minors')}>
          <Group mt="xs">
            <Radio value="Yes" label="Yes" />
            <Radio value="No" label="No" />
          </Group>
        </Radio.Group>

        <Stack mt="xs">
          <Checkbox.Group
            size="md"
            required
            label="How can users contact you for any questions regarding your Terms of Use Policy?"
            description="Select one or many"
            withAsterisk
          >
            <></>
          </Checkbox.Group>
          <Stack mt="xs">
            <Stack>
              <Checkbox size="md" label="By email" checked={true} />
              <TextInput required type="email" placeholder="terms@supaterms.com" {...form.getInputProps('contactbyemail.value')} />
            </Stack>

            <Stack>
              <Checkbox
                size="md"
                label="By visiting a page on our website"
                checked={form.values.contactbywebsite.active}
                onChange={(i) => form.setFieldValue('contactbywebsite.active', i.currentTarget.checked)}
              />
              {form.values.contactbywebsite.active && (
                <TextInput required type="url" placeholder="https://supaterms.com" {...form.getInputProps('contactbywebsite.value')} />
              )}
            </Stack>

            <Stack>
              <Checkbox
                size="md"
                label="Phone number"
                checked={form.values.contactbyphone.active}
                onChange={(i) => form.setFieldValue('contactbyphone.active', i.currentTarget.checked)}
              />
              {form.values.contactbyphone.active && (
                <PhoneInput required placeholder="+1 555 555 5555" {...form.getInputProps('contactbyphone.value')} />
              )}
            </Stack>

            <Stack>
              <Checkbox
                size="md"
                label="By sending post mail"
                value="By sending post mail"
                checked={form.values.contactbypostmail.active}
                onChange={(i) => form.setFieldValue('contactbypostmail.active', i.currentTarget.checked)}
              />
              {form.values.contactbypostmail.active && (
                <TextInput
                  required
                  placeholder="123 Main Street, Anytown, California, 12345"
                  {...form.getInputProps('contactbypostmail.value')}
                />
              )}
            </Stack>
          </Stack>
        </Stack>

        <Space h={100} />
      </Stack>

      <Button type='submit' pos="fixed" bottom={16} right={16} className='glow'>Generate Policy</Button>
    </form>

  )
}