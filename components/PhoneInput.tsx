import { NumberInput, NumberInputProps } from '@mantine/core';
import React from 'react';

export type PhoneInputProps = Omit<NumberInputProps, 'parser' | 'formatter' | 'precision' | 'step' | 'min' | 'hideControls'>

export function PhoneInput(props: PhoneInputProps) {
  return (
    <NumberInput
      {...props}
      // precision={2}
      min={-1}
      // step={0.05}
      hideControls
    // parser={(value) => value?.replace(/\$\s?|(-*)/g, '')}
    // formatter={(value) => (!Number.isNaN(parseFloat(value || '')) ? `${value}`?.replace(/\B(?=(\d{4})+(?!\d))/g, '-') : '')}
    />
  );
}

// generate regex formatter for money input that allows floating point numbers
// describe this regex in a comment /\B(?=(\d{5})+(?!\d))/g
