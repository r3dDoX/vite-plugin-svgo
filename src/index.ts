import {Config, optimize} from 'svgo';
import fs from 'fs';
import {Plugin} from 'vite';

const VITE_PLUGIN_NAME = 'vite-plugin-svgo';
const fileRegex = /\.svg$/;

export default function viteSvgPlugin(svgoOptimizeOptions: Omit<Config, 'path'> = {}): Plugin {
  return {
    name: VITE_PLUGIN_NAME,
    enforce: 'pre',

    async load(id: string) {
      if (fileRegex.test(id)) {
        let svgCode;
        try {
          svgCode = await fs.promises.readFile(id, 'utf8');
        } catch (exception) {
          console.warn(`${id} couldn't be loaded by vite-plugin-svgo: `, exception);
          return;
        }
        try {
          const optimizedSvg = optimize(svgCode, {
            path: id,
            ...svgoOptimizeOptions,
          });
          return `export default \`${optimizedSvg.data}\`;`;
        } catch (exception) {
          console.error(`${id} errored during svg optimization: `, exception);
        }
      }
    },
  };
};
