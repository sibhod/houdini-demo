declare type CSSSyntaxProperty =
  | '<alpha-value>'
  | '<angle-percentage>'
  | '<angle>'
  | '<basic-shape>'
  | '<blend-mode>'
  | '<color>'
  | '<custom-ident>'
  | '<dimension>'
  | '<display-box>'
  | '<display-inside>'
  | '<display-internal>'
  | '<display-legacy>'
  | '<display-listitem>'
  | '<display-outside>'
  | '<easing-function>'
  | '<filter-function>'
  | '<flex>'
  | '<frequency-percentage>'
  | '<frequency>'
  | '<gradient>'
  | 'ident'
  | '<image>'
  | '<integer>'
  | '<length-percentage>'
  | '<length>'
  | '<number>'
  | '<percentage>'
  | '<position>'
  | '<ratio>'
  | '<resolution>'
  | '<shape>'
  | '<string>'
  | '<time-percentage>'
  | '<time>'
  | '<transform-function>'
  | '<translation-value>';

declare type CSSPropertyDefinition = {
  name: string;
  syntax?: '*' | CSSSyntaxProperty;
  inherits: boolean;
  initialValue?: string;
};

export declare namespace CSS {
  function registerProperty(def: CSSPropertyDefinition): void;
  const paintWorklet: Worklet;
}

declare module '*.png' {
  const value: string;
  export default value;
}
