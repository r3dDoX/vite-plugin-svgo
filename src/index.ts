import {optimize, OptimizeOptions} from 'svgo';
import fs from 'fs';
import {Plugin} from 'vite';

const fileRegex = /\.svg$/;

export default function viteSvgPlugin(svgoOptimizeOptions: Omit<OptimizeOptions, 'path'> = {}): Plugin {
  return {
    name: 'vite-svg-plugin',
    enforce: 'pre',

    async load(id: string) {
      if (fileRegex.test(id)) {
        const idWithoutQuery = id.replace(/\?.*$/, '');
        let svgCode;
        try {
          svgCode = await fs.promises.readFile(idWithoutQuery, 'utf8');
        } catch (ex) {
          console.warn(`${id} couldn't be loaded by vite-svg-plugin: `, ex);
          return;
        }
        const optimizedSvg = optimize(svgCode, {
          path: idWithoutQuery,
          ...svgoOptimizeOptions,
        });
        if (optimizedSvg.error === undefined) {
          return `export default \`${optimizedSvg['data']}\`;`;
        } else {
          console.warn(`${id} errored during svg optimization: `, optimizedSvg.error);
        }
      }
    },
  };
};
