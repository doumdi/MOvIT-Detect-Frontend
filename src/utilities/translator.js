import { MDText } from 'i18n-react';

const texts = require('./../res/texts.yaml');

const T = new MDText(texts, { MDFlavor: 1 });

export { T };
