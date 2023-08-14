import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

const YAML_CONFIG_PROD = 'production.yaml';
const YAML_CONFIG_DEV = 'kafka.config.yaml';

export default () => {
  return yaml.load(
    process.env.NODE_ENV === 'production'
      ? readFileSync(`./${YAML_CONFIG_PROD}`, 'utf8')
      : readFileSync(`./config/${YAML_CONFIG_DEV}`, 'utf8'),
  ) as Record<string, any>;
};
