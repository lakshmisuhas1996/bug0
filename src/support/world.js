const { setWorldConstructor } = require('@cucumber/cucumber');
const { RPWorld } = require('@reportportal/agent-js-cucumber');

/**
 * Custom World object for Cucumber scenarios
 * This provides a shared context across steps
 * Extends RPWorld if Report Portal is configured
 */
let WorldClass;

try {
  // Try to load RPWorld for Report Portal integration
  const { RPWorld } = require('@reportportal/agent-js-cucumber');
  
  class World extends RPWorld {
    constructor({ attach, log, parameters }) {
      super({ attach, log, parameters });
      this.page = null;
      this.context = null;
      this.browser = null;
      this.sharedData = new Map();
    }

    /**
     * Store data in world context
     * @param {string} key
     * @param {*} value
     */
    setData(key, value) {
      this.sharedData.set(key, value);
    }

    /**
     * Get data from world context
     * @param {string} key
     * @returns {*}
     */
    getData(key) {
      return this.sharedData.get(key);
    }
  }
  
  WorldClass = World;
} catch (error) {
  // If Report Portal is not available, use basic World class
  class World {
    constructor({ attach, log, parameters }) {
      this.attach = attach;
      this.log = log;
      this.parameters = parameters;
      this.page = null;
      this.context = null;
      this.browser = null;
      this.sharedData = new Map();
    }

    /**
     * Store data in world context
     * @param {string} key
     * @param {*} value
     */
    setData(key, value) {
      this.sharedData.set(key, value);
    }

    /**
     * Get data from world context
     * @param {string} key
     * @returns {*}
     */
    getData(key) {
      return this.sharedData.get(key);
    }
  }
  
  WorldClass = World;
}

setWorldConstructor(WorldClass);

module.exports = WorldClass;

