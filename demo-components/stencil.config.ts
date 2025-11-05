import { Config } from '@stencil/core';
import { vueOutputTarget } from '@stencil/vue-output-target';

export const config: Config = {
  namespace: 'demo-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    vueOutputTarget({
      componentCorePackage: 'demo-components',
      proxiesFile: '../demo-components-vue/src/proxies.ts',
    }),
  ],
};
