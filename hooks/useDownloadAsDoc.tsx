import { Button, Group, Stack, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { signal } from '@preact/signals-react';
import { Subtitle } from 'components/typography/Text';
import { generateRandomString } from 'lib/app/codeblock';
import { doc, docToBlob, paragraph } from 'lib/docx';

const downloadAsWordFile = async (file_name: string, text: string) => {
  const ps = text.split('\n').map((i) => paragraph(i));

  const docu = doc(ps);
  const docBlob = await docToBlob(docu);
  const url = URL.createObjectURL(docBlob);
  const link = document.createElement('a');
  link.download = file_name + '.docx';
  link.href = url;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  modals.closeAll();
};

export const downloadNoteAsWordFile = async (file_name: string, text: string) => {
  const data = 'data:application/vnd.ms-word;charset=utf-8' + encodeURIComponent(text);

  const link = document.createElement('a');
  link.download = file_name + '.docx';
  link.href = data;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  modals.closeAll();
};

const fileName = signal('');
export const useDownloadAsDoc = () => {
  const openModal = (text: string) => {
    fileName.value = `file-${generateRandomString(3, true)}`;

    modals.open({
      title: 'Download message in Word Document',
      centered: true,
      children: (
        <Stack>
          <Subtitle>Change file name</Subtitle>
          <TextInput
            defaultValue={fileName.value}
            onChange={(e) => {
              fileName.value = e.target.value;
            }}
          />
          <Group w="100%" mt="md" position="right">
            <Button variant="default" onClick={() => modals.closeAll()}>
              Cancel
            </Button>
            <Button onClick={() => downloadAsWordFile(fileName.value, text)}>Confirm</Button>
          </Group>
        </Stack>
      )
    });
  };

  // const downloadAsPdfFile = async (file_name: string, text: string) => {
  //   const file = await renderToFile(text, file_name + '.pdf');
  // };

  return openModal;
};

export const downloadAsDoc = (text: string) => {
  fileName.value = `file-${generateRandomString(3, true)}`;

  modals.open({
    title: 'Download message in Word Document',
    centered: true,
    children: (
      <Stack>
        <Subtitle>Change file name</Subtitle>
        <TextInput
          defaultValue={fileName.value}
          onChange={(e) => {
            fileName.value = e.target.value;
          }}
        />
        <Group w="100%" mt="md" position="right">
          <Button variant="default" onClick={() => modals.closeAll()}>
            Cancel
          </Button>
          <Button onClick={() => downloadAsWordFile(fileName.value, text)}>Confirm</Button>
        </Group>
      </Stack>
    )
  });
};
