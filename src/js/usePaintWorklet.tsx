import { useMemo } from 'react';
import { PaintProgram } from 'PaintProgram';

type PaintProgramClass = new () => PaintProgram;

export const usePaintWorklet = (program: PaintProgramClass) => {
  return useMemo(() => {
    const p = new program();
    p.register();

    return p;
  }, []);
};
