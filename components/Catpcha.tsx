"use client"
import { CAPTCHA_KEY } from '@/constants';
import Turnstile from 'react-turnstile';

type CatpchaProps = {
  // eslint-disable-next-line no-unused-vars
  onVerify: (token: string) => void;
  onLoad: () => void;
  onError: () => void;
  onExpire: () => void;
};

export function Catpcha(props: CatpchaProps) {
  return <Turnstile sitekey={CAPTCHA_KEY} {...props} theme="dark" className="flex items-center justify-center mt-4" />;
}
