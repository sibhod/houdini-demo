import { blobify } from 'util/blobify';
import { Interpolation } from 'styled-components';
import { CSSPropertyDefinition } from 'types/CSSPropertyDefinition';

declare namespace CSS {
  function registerProperty(def: CSSPropertyDefinition): void;
  function supports(s: string, v?: string): boolean;
  const paintWorklet: Worklet;
}

interface PaintSize {
  readonly width: number;
  readonly height: number;
}

interface ContextOptions {
  alpha?: boolean;
}

type PaintParameters = [
  ctx: CanvasRenderingContext2D,
  size: PaintSize,
  props: Map<string, any>,
  args: string[],
];

export abstract class PaintProgram {
  abstract paint(...p: PaintParameters): void;
  abstract get css(): Interpolation<any>;

  protected registerProperties(defs: CSSPropertyDefinition[]) {
    return defs.map(d => {
      CSS.registerProperty(d);
      return d.name;
    });
  }

  protected toString(): string {
    return `
      class ${this.className} {
        static get inputArguments() {
          return ${JSON.stringify(this.args)};
        }

        static get inputProperties() {
          return ${JSON.stringify(this.props)};
        }

        static get contextOptions() {
          return ${JSON.stringify(this.options)};
        }

        ${this.paint.toString().slice(9)}
      }

      registerPaint('${this.key}', ${this.className});
    `;
  }

  register() {
    if (!this.key || !this.className) {
      throw new Error('PaintProgram must define a key and className');
    }
    const blob = blobify(this.toString());

    return CSS.paintWorklet
      .addModule(blob)
      .catch(error => console.error(error));
  }

  protected key: string = '';
  protected className: string = '';

  protected props: string[] = [];
  protected args: string[] = [];
  protected options: ContextOptions = {};
}
