import { FC, useEffect, useState } from 'react';
import {
  $createParagraphNode,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalNode,
  TextFormatType,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $findMatchingParent } from '@lexical/utils';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  HeadingTagType,
} from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import {
  ALargeSmallIcon,
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  HighlighterIcon,
  ItalicIcon,
  QuoteIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
} from 'lucide-react';
import ToggleButton from '../../components/ToggleButton';
import { Select, SelectItem, SelectSeparator } from '../../components/Select';

const ToolbarPlugin: FC = () => {
  const [editor] = useLexicalComposerContext();

  /**
   * 当前选中文本的格式，如 bold、italic 等
   */
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isHighlighter, setIsHighlighter] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);

  /**
   * 当前选中文本的类型，如 h1、h2、p、blockquote 等
   */
  const [blockType, setBlockType] = useState('paragraph');

  /**
   * 注册一个编辑器状态更新的回调函数，在回调函数内读取选中文本的状态
   */
  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          return;
        }

        // text format
        setIsBold(selection.hasFormat('bold'));
        setIsItalic(selection.hasFormat('italic'));
        setIsUnderline(selection.hasFormat('underline'));
        setIsStrikethrough(selection.hasFormat('strikethrough'));
        setIsCode(selection.hasFormat('code'));
        setIsHighlighter(selection.hasFormat('highlight'));
        setIsSuperscript(selection.hasFormat('superscript'));
        setIsSubscript(selection.hasFormat('subscript'));

        // block type
        const anchorNode = selection.anchor.getNode();
        let element =
          anchorNode.getKey() === 'root'
            ? anchorNode
            : $findMatchingParent(anchorNode, (node: LexicalNode) => {
                const parent = node.getParent();
                return parent !== null && $isRootOrShadowRoot(parent);
              });
        if (element === null) {
          element = anchorNode.getTopLevelElementOrThrow();
        }

        // 这里仅考虑了 Heading、Quote 和 Paragraph
        const type = $isHeadingNode(element) ? element.getTag() : element.getType();
        setBlockType(type);
      });
    });

    return unregister;
  }, [editor]);

  /**
   * 更新选中文本的格式
   */
  const formatText = (type: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
  };

  /**
   * 设置为段落
   */
  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  /**
   * 设置为标题
   */
  const formatHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createHeadingNode(headingSize));
    });
  };

  /**
   * 设置为引用
   */
  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createQuoteNode());
    });
  };

  const handleBlockTypeChange = (type: string) => {
    setBlockType(type);
    if (type === 'paragraph') {
      formatParagraph();
    }
    if (
      type === 'h1' ||
      type === 'h2' ||
      type === 'h3' ||
      type === 'h4' ||
      type === 'h5' ||
      type === 'h6'
    ) {
      formatHeading(type);
    }
    if (type === 'quote') {
      formatQuote();
    }
  };

  return (
    <div className="flex items-center px-2 py-1.5 border-b border-gray-200 bg-white">
      <Select value={blockType} onValueChange={handleBlockTypeChange}>
        <SelectItem value="paragraph" label="段落" icon={ALargeSmallIcon} />
        <SelectSeparator />
        <SelectItem value="h1" label="一级标题" icon={Heading1Icon} />
        <SelectItem value="h2" label="二级标题" icon={Heading2Icon} />
        <SelectItem value="h3" label="三级标题" icon={Heading3Icon} />
        <SelectItem value="h4" label="四级标题" icon={Heading4Icon} />
        <SelectItem value="h5" label="五级标题" icon={Heading5Icon} />
        <SelectItem value="h6" label="六级标题" icon={Heading6Icon} />
        <SelectSeparator />
        <SelectItem value="quote" label="引用块" icon={QuoteIcon} />
      </Select>
      <div className="w-px h-5 mx-2 bg-gray-200 rounded"></div>
      <div className="flex gap-x-1">
        <ToggleButton
          icon={BoldIcon}
          aria-label="加粗"
          pressed={isBold}
          onPressedChange={() => formatText('bold')}
        />
        <ToggleButton
          icon={ItalicIcon}
          aria-label="斜体"
          pressed={isItalic}
          onPressedChange={() => formatText('italic')}
        />
        <ToggleButton
          icon={UnderlineIcon}
          aria-label="下划线"
          pressed={isUnderline}
          onPressedChange={() => formatText('underline')}
        />
        <ToggleButton
          icon={StrikethroughIcon}
          aria-label="删除线"
          pressed={isStrikethrough}
          onPressedChange={() => formatText('strikethrough')}
        />
        <ToggleButton
          icon={CodeIcon}
          aria-label="代码"
          pressed={isCode}
          onPressedChange={() => formatText('code')}
        />
        <ToggleButton
          icon={HighlighterIcon}
          aria-label="高亮"
          pressed={isHighlighter}
          onPressedChange={() => formatText('highlight')}
        />
        <ToggleButton
          icon={SuperscriptIcon}
          aria-label="上标"
          pressed={isSuperscript}
          onPressedChange={() => formatText('superscript')}
        />
        <ToggleButton
          icon={SubscriptIcon}
          aria-label="下标"
          pressed={isSubscript}
          onPressedChange={() => formatText('subscript')}
        />
      </div>
    </div>
  );
};

export default ToolbarPlugin;
