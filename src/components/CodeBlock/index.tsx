import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeBlock = {
  code({ className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    return match ? (
      <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div" {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code>{children}</code>
    );
  },
};

export default CodeBlock;
