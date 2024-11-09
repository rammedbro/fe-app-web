import env from 'postcss-preset-env';
import cssnano from 'cssnano';

export default {
  plugins: [
    env(),
    cssnano(),
  ],
};
