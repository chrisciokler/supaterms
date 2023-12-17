"use client"
import { useDocGenerator } from '@/hooks/useDocGenerator';
import { FC, memo } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';

export const MemoizedReactMarkdown: FC<Options> = memo(ReactMarkdown);

type Props = {
  content: string;
};

export const Message = (props: Props) => {

  return (
    <MemoizedReactMarkdown
      className="prose prose-sm dark:prose-invert py-4 box-border"
      components={{

        h1({ children }) {
          return <h1 className="pb-4 text-3xl font-extrabold tracking-tight lg:text-4xl">{children}</h1>;
        },
        h2({ children }) {
          return <h2 className="py-4 text-2xl font-bold tracking-tight lg:text-3xl">{children}</h2>;
        },
        h3({ children }) {
          return <h3 className="py-4 text-xl font-bold tracking-tight lg:text-2xl">{children}</h3>;
        },
        h4({ children }) {
          return <h4 className="py-4 text-lg font-semibold tracking-tight lg:text-xl">{children}</h4>;
        },
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>;
        },


        ol({ children }) {
          return <ol style={{ paddingInlineStart: 20 }}>{children}</ol>;
        },

        pre({ children }) {
          return <pre className="whitespace-normal">{children}</pre>;
        },

        table({ children }) {
          return <table className="border-collapse border border-black py-1 px-3 dark:border-white">{children}</table>;
        },

        th({ children }) {
          return <th className="break-words border border-black bg-gray-500 py-1 px-3 text-white dark:border-white">{children}</th>;
        },

        td({ children }) {
          return <td className="break-words border border-black py-1 px-3 dark:border-white">{children}</td>;
        }
      }}
    >
      {props.content}
    </MemoizedReactMarkdown>
  );
};

export const MessageArea = () => {
  const { message } = useDocGenerator();

  return (
    <Message content={message} />
  )
}