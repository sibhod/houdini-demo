import { PaintProgram } from 'PaintProgram';
import { css } from 'styled-components';

export class StripesPaintProgram extends PaintProgram {
  constructor() {
    super();
    this.props = this.registerProperties([
      {
        name: '--progress',
        syntax: '<percentage>',
        inherits: false,
        initialValue: '0%',
      },
      {
        name: '--size',
        syntax: '<length>',
        inherits: false,
        initialValue: '32px',
      },
      {
        name: '--fill',
        syntax: '<color>',
        inherits: false,
        initialValue: 'transparent',
      },
      {
        name: '--stripe-color',
        syntax: '<color>',
        inherits: false,
        initialValue: 'white',
      },
    ]);
    this.key = 'stripes';
    this.className = 'Stripes';
  }

  paint(
    ctx: CanvasRenderingContext2D,
    dimensions: { width: number; height: number },
    props: Map<string, any>,
    args: string[],
  ) {
    const size = parseFloat(props.get('--size'));
    const fill = props.get('--fill');
    const stripeColor = props.get('--stripe-color');
    const progress = parseFloat(props.get('--progress')) / 100;

    const hSize = size * 0.5;
    const hSizeP = hSize * progress;

    ctx.fillStyle = fill;
    ctx.rect(0, 0, size, size);
    ctx.fill();

    ctx.fillStyle = stripeColor;
    ctx.beginPath();
    ctx.moveTo(-hSize, hSize);
    ctx.lineTo(hSize, -hSize);
    ctx.lineTo(hSize + hSizeP, -hSize + hSizeP);
    ctx.lineTo(-hSize + hSizeP, hSize + hSizeP);

    ctx.moveTo(0, size);
    ctx.lineTo(size, 0);
    ctx.lineTo(size + hSizeP, hSizeP);
    ctx.lineTo(hSizeP, size + hSizeP);
    ctx.closePath();
    ctx.fill();
  }

  get css() {
    return css`
      background-image: paint(${this.key});
    `;
  }
}
