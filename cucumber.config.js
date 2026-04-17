module.exports = {
  default: {
    require: [
      'hooks.js',
      'src/steps/**/*.js',
      'src/support/world.js'
    ],
    format: [
      '@reportportal/agent-js-cucumber'
    ],
    publishQuiet: true,
    parallel: 1
  }
};
