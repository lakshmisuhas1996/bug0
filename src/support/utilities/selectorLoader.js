const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// In CommonJS, __dirname already exists
const projectRoot = path.resolve(__dirname, '../../..');

/**
 * Utility to load selectors from YAML files
 */
class SelectorLoader {
  constructor() {
    this.selectors = {};
    this.selectorsPath = path.join(projectRoot, 'selectors');
  }

  loadSelectors() {
    if (Object.keys(this.selectors).length > 0) {
      return this.selectors;
    }

    try {
      const files = fs.readdirSync(this.selectorsPath);
      const yamlFiles = files.filter(
        (file) => file.endsWith('.yml') || file.endsWith('.yaml')
      );

      yamlFiles.forEach((file) => {
        const filePath = path.join(this.selectorsPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = yaml.load(fileContent);
        Object.assign(this.selectors, data);
      });

      return this.selectors;
    } catch (error) {
      console.warn(
        `Warning: Could not load selectors from ${this.selectorsPath}: ${error.message}`
      );
      return {};
    }
  }

  getSelector(selectorName) {
    const selectors = this.loadSelectors();
    const selector = selectors[selectorName];
    if (!selector) {
      console.warn(
        `Selector "${selectorName}" not found. Available: ${Object.keys(selectors).join(', ')}`
      );
      return selectorName;
    }
    return selector;
  }
}

module.exports = SelectorLoader;
