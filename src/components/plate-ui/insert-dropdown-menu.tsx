'use client';

import React from 'react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import {
  ELEMENT_CODE_BLOCK,
  insertEmptyCodeBlock,
} from '@udecode/plate-code-block';
import {
  focusEditor,
  insertEmptyElement,
  useEditorRef,
} from '@udecode/plate-common';
// import { ELEMENT_EXCALIDRAW } from '@udecode/plate-excalidraw';
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@udecode/plate-heading';
import { ELEMENT_HR } from '@udecode/plate-horizontal-rule';
// import {
//   KEY_LIST_STYLE_TYPE,
//   toggleIndentList,
// } from '@udecode/plate-indent-list';
import { ELEMENT_LINK, triggerFloatingLink } from '@udecode/plate-link';
import { toggleList } from '@udecode/plate-list';
import {
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED,
  insertMedia,
} from '@udecode/plate-media';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ELEMENT_TABLE, insertTable } from '@udecode/plate-table';

import { Icons } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  useOpenState,
} from '@/components/plate-ui/dropdown-menu';
import { ToolbarButton } from '@/components/plate-ui/toolbar';

const items = [
  {
    label: '基础区块',
    items: [
      {
        value: ELEMENT_PARAGRAPH,
        label: '正文',
        description: '正文',
        icon: Icons.paragraph,
      },
      {
        value: ELEMENT_H1,
        label: '一级标题',
        description: '一级标题',
        icon: Icons.h1,
      },
      {
        value: ELEMENT_H2,
        label: '二级标题',
        description: '二级标题',
        icon: Icons.h2,
      },
      {
        value: ELEMENT_H3,
        label: '三级标题',
        description: '三级标题',
        icon: Icons.h3,
      },
      {
        value: ELEMENT_H4,
        label: '四级标题',
        description: '四级标题',
        icon: Icons.h4,
      },
      {
        value: ELEMENT_H5,
        label: '五级标题',
        description: '五级标题',
        icon: Icons.h5,
      },
      {
        value: ELEMENT_H6,
        label: '六级标题',
        description: '六级标题',
        icon: Icons.h6,
      },
      {
        value: ELEMENT_TABLE,
        label: '表格',
        description: '表格',
        icon: Icons.table,
      },
      {
        value: 'ul',
        label: '无序列表',
        description: '无序列表',
        icon: Icons.ul,
      },
      {
        value: 'ol',
        label: '有序列表',
        description: '有序列表',
        icon: Icons.ol,
      },
      {
        value: ELEMENT_BLOCKQUOTE,
        label: '引用',
        description: '引用 (⌘+⇧+.)',
        icon: Icons.blockquote,
      },
      {
        value: ELEMENT_HR,
        label: '分割线',
        description: '分割线 (---)',
        icon: Icons.hr,
      },
    ],
  },
  {
    label: '高级区块',
    items: [
      {
        value: ELEMENT_CODE_BLOCK,
        label: '代码块',
        description: '代码块 (```)',
        icon: Icons.codeblock,
      },
      {
        value: ELEMENT_IMAGE,
        label: '图片',
        description: '图片',
        icon: Icons.image,
      },
    ],
  },
  {
    label: '行内区块',
    items: [
      {
        value: ELEMENT_LINK,
        label: '链接',
        description: '链接',
        icon: Icons.link,
      },
    ],
  },
];

export function InsertDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="插入" isDropdown>
          <Icons.add />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="flex max-h-[500px] min-w-0 flex-col gap-0.5 overflow-y-auto"
      >
        {items.map(({ items: nestedItems, label }, index) => (
          <React.Fragment key={label}>
            {index !== 0 && <DropdownMenuSeparator />}

            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            {nestedItems.map(
              ({ value: type, label: itemLabel, icon: Icon }) => (
                <DropdownMenuItem
                  key={type}
                  className="min-w-[180px]"
                  onSelect={async () => {
                    switch (type) {
                      case ELEMENT_CODE_BLOCK: {
                        insertEmptyCodeBlock(editor);

                        break;
                      }
                      case ELEMENT_IMAGE: {
                        await insertMedia(editor, { type: ELEMENT_IMAGE });

                        break;
                      }
                      case ELEMENT_MEDIA_EMBED: {
                        await insertMedia(editor, {
                          type: ELEMENT_MEDIA_EMBED,
                        });

                        break;
                      }
                      case 'ul':
                      case 'ol': {
                        insertEmptyElement(editor, ELEMENT_PARAGRAPH, {
                          select: true,
                          nextBlock: true,
                        });

                        // if (settingsStore.get.checkedId(KEY_LIST_STYLE_TYPE)) {
                        //   toggleIndentList(editor, {
                        //     listStyleType: type === 'ul' ? 'disc' : 'decimal',
                        //   });
                        // } else if (settingsStore.get.checkedId('list')) {
                        // toggleList(editor, { type });
                        // }
                        toggleList(editor, { type });

                        break;
                      }
                      case ELEMENT_TABLE: {
                        insertTable(editor);

                        break;
                      }
                      case ELEMENT_LINK: {
                        triggerFloatingLink(editor, { focused: true });

                        break;
                      }
                      default: {
                        insertEmptyElement(editor, type, {
                          select: true,
                          nextBlock: true,
                        });
                      }
                    }

                    focusEditor(editor);
                  }}
                >
                  <Icon className="mr-2 size-5" />
                  {itemLabel}
                </DropdownMenuItem>
              )
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
