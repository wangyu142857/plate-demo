import React from 'react';
import { withRef } from '@udecode/cn';

import {
  ELEMENT_CODE_BLOCK,
  useToggleCodeBlockButton,
} from '@udecode/plate-code-block';

import { Icons } from '@/components/icons';

import { ToolbarButton } from './toolbar';

export const CodeBlockToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType?: typeof ELEMENT_CODE_BLOCK;
  }
>(({ nodeType, ...rest }, ref) => {
  const { props } = useToggleCodeBlockButton();

  return (
    <ToolbarButton ref={ref} {...props} {...rest}>
      <Icons.code />
    </ToolbarButton>
  );
});
