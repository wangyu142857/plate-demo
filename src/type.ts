import { Value } from '@udecode/plate-common';
export interface IEditorProps {
  id?: string;
  value?: Value;
  initialValue?: Value;
  readOnly?: boolean;
  disabledToolbar?: boolean; // 禁用toolbar
  onChange?: (value: Value) => void;
}
