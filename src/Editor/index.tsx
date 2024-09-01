import { FC } from 'react';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { NODES } from './nodes';

export interface EditorProps {}

const Editor: FC<EditorProps> = () => {
  const initialConfig: InitialConfigType = {
    namespace: 'editor',
    theme: {
      root: 'prose max-w-none focus:outline-none',
      text: {
        bold: 'font-medium',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
        highlight: 'bg-yellow-200',
      },
    },
    nodes: NODES,
    onError: console.error,
  };

  return (
    <div className="min-h-64 border-2 border-gray-200 rounded-lg overflow-hidden">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <div className="relative p-4">
          <RichTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={
              <div className="absolute top-4 text-gray-500 select-none pointer-events-none">
                来写点什么吧
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <AutoFocusPlugin />
      </LexicalComposer>
    </div>
  );
};

export default Editor;
