import { CSSSyntaxProperty } from 'types/CSSSyntaxProperty';

export type CSSPropertyDefinition = {
  name: string;
  syntax?: '*' | CSSSyntaxProperty;
  inherits: boolean;
  initialValue?: string;
};
