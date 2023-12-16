"use client"
import { Steps } from '@/components/Steps';
import { privacyPolicyAssistant, privacyPolicyTemplate } from '@/lib/privacyTemplate';
import { Title, Text, Button, Center, TagsInput, TextInput, Group, Card, Badge, SimpleGrid, Stack, Checkbox, Radio, Select, Space, MultiSelect, ActionIcon } from '@mantine/core'
import { useForm } from '@mantine/form';
import { IconArrowLeft, IconAt } from "@tabler/icons-react";
import { useState, useRef, useCallback } from "react";
import { PhoneInput } from './PhoneInput';
import { countries } from '@/constants';
import { useRouter } from 'next/navigation';

type Platform = 'website' | 'app';
export type PrivacyProps = {
  platform: Platform[];
  url: string;
  websitename: string;
  appname: string;
  entity: 'business' | 'individual';
  businessname: string;
  businessaddress: string;
  country: string;
  informationCollected: string[];
  contactbyemail: { active: boolean; value: string };
  contactbywebsite: { active: boolean; value: string };
  contactbyphone: { active: boolean; value: string };
  contactbypostmail: { active: boolean; value: string };
  trackingtools: 'Yes' | 'No';
  sendemails: 'Yes' | 'No';
  showads: 'Yes' | 'No';
  productsorservicespayment: 'Yes' | 'No';
  remarketing: 'Yes' | 'No';
  acceptspayments: 'Yes' | 'No';
  under13info: 'Yes' | 'No';
};

const initialValues: PrivacyProps = {
  platform: [],
  url: '',
  websitename: '',
  appname: '',
  country: '',
  informationCollected: [],
  entity: 'business',
  trackingtools: 'Yes',
  sendemails: 'Yes',
  showads: 'Yes',
  productsorservicespayment: 'Yes',
  remarketing: 'Yes',
  acceptspayments: 'No',
  under13info: 'Yes',
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
  businessname: '',
  businessaddress: ''
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

export function PrivacyPolicyGenerator() {
  const stopConversationRef = useRef<boolean>(false);
  const form = useForm({ initialValues });
  const [refunds, setRefunds] = useState(refundsdata);
  const [isloading, setLoading] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const toggle = (value: boolean) => {
    setLoading(value);
  };

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
      // let content = '';
      // const system = termsPolicyAssistant;

      // toggle(true);

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
    <form onSubmit={form.onSubmit((values) => handleSubmit(privacyPolicyTemplate(values)))}>
      <Stack className='w-full h-full max-w-[450px]'>
        <Group>
          <h1 className='text-[30px] text-glow max-w-[750px] md:max-w-[280px] md:text-3xl font-extrabold '><BacktoDocsButton /> SupaTerms Privacy Policy</h1>
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
          <TextInput label="What is your website name?" required placeholder="supaterms" {...form.getInputProps('websitename')} />
        )}
        {form.values.platform.includes('app') && (
          <TextInput label="What is your app name?" required placeholder="supaterms" {...form.getInputProps('appname')} />
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
          <TextInput label="What is your business name" required placeholder="supaterms LLC" {...form.getInputProps('businessname')} />
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

        <Checkbox.Group
          size="md"
          label="What kind of personal information do you collect from users?"
          description="Select one or many"
          withAsterisk
          {...form.getInputProps('informationCollected')}
        >
          <Stack mt="xs">
            <Checkbox label="Email address" value="Email address" />

            <Checkbox label="First name and last name" value="First name and last name" />

            <Checkbox label="Phone number" value="Phone number" />

            <Checkbox label="Address, State, Province, ZIP/Postal code, City" value="Address, State, Province, ZIP/Postal code, City" />

            <Checkbox
              label="Social Media Profile information (i.e. Sign with Google, Sign In With Twitter)"
              value="Social Media Profile information (i.e. Sign with Google, Sign In With Twitter)"
            />

            <Checkbox label="Others" value="Others" />
          </Stack>
        </Checkbox.Group>

        <Stack mt="xs">
          <Checkbox.Group
            size="md"
            required
            label="How can users contact you for any questions regarding your Privacy Policy?"
            description="Select one or many"
            withAsterisk
          >
            <></>
          </Checkbox.Group>
          <Stack mt="xs">
            <Stack>
              <Checkbox size="md" label="By email" checked={true} />
              <TextInput required type="email" placeholder="privacy@supaterms.com" {...form.getInputProps('contactbyemail.value')} />
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

        <Radio.Group
          size="md"
          label="Do you use tracking and/or analytics tools, such as Google Analytics?"
          withAsterisk
          {...form.getInputProps('trackingtools')}
        >
          <Group mt="xs">
            <Radio value="Yes" label="Yes" />
            <Radio value="No" label="No" />
          </Group>
        </Radio.Group>

        <Radio.Group size="md" label="Do you send emails to users?" withAsterisk {...form.getInputProps('sendemails')}>
          <Group mt="xs">
            <Radio value="Yes" label="Yes" />
            <Radio value="No" label="No" />
          </Group>
        </Radio.Group>

        <Radio.Group size="md" label="Do you show ads?" withAsterisk {...form.getInputProps('showads')}>
          <Group mt="xs">
            <Radio value="Yes" label="Yes" />
            <Radio value="No" label="No" />
          </Group>
        </Radio.Group>

        <Radio.Group size="md" label="Can users pay for products or services?" withAsterisk {...form.getInputProps('productsorservicespayment')}>
          <Group mt="xs">
            <Radio value="Yes" label="Yes" />
            <Radio value="No" label="No" />
          </Group>
        </Radio.Group>

        <Radio.Group
          size="md"
          label="Do you use remarketing services for marketing & advertising purposes?"
          withAsterisk
          {...form.getInputProps('remarketing')}
        >
          <Group mt="xs">
            <Radio value="Yes" label="Yes" />
            <Radio value="No" label="No" />
          </Group>
        </Radio.Group>

        <Radio.Group size="md" label="Do you accept payments?" withAsterisk {...form.getInputProps('acceptspayments')}>
          <Group mt="xs">
            <Radio value="Yes" label="Yes" />
            <Radio value="No" label="No" />
          </Group>
        </Radio.Group>

        <Radio.Group
          size="md"
          label="Do you collect information from kids under the age of 13?"
          withAsterisk
          {...form.getInputProps('under13info')}
        >
          <Group mt="xs">
            <Radio value="Yes" label="Yes" />
            <Radio value="No" label="No" />
          </Group>
        </Radio.Group>

        <Space h={100} />
      </Stack>

      <Button pos="fixed" bottom={16} right={16} className='glow'>Generate Policy</Button>
    </form>

  )
}