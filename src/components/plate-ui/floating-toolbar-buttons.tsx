import React from 'react';
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';
import { useEditorReadOnly } from '@udecode/plate-common';

import { Icons } from '@/components/icons';
import { LinkToolbarButton } from '@/components/plate-ui/link-toolbar-button';

import { MarkToolbarButton } from './mark-toolbar-button';
import { MoreDropdownMenu } from './more-dropdown-menu';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';

export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <>
      {!readOnly && (
        <>
          <TurnIntoDropdownMenu />

          <MarkToolbarButton nodeType={MARK_BOLD} tooltip="粗体 (⌘+B)">
            <Icons.bold />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={MARK_ITALIC} tooltip="斜体 (⌘+I)">
            <Icons.italic />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={MARK_UNDERLINE} tooltip="下划线 (⌘+U)">
            <Icons.underline />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={MARK_CODE} tooltip="代码块 (⌘+E)">
            <Icons.code />
          </MarkToolbarButton>

          <LinkToolbarButton />
        </>
      )}

      <MoreDropdownMenu />
    </>
  );
}
