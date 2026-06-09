module.exports = {
  extends: ['@commitlint/config-conventional'],

  parserPreset: {
    parserOpts: {
      // Format: <type>/#<scope>: <description>
      headerPattern: /^(\w*)\/#(\w*): (.*)$/,

      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },

  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
      ],
    ],

    'header-min-length': [2, 'always', 10],

    'header-max-length': [2, 'always', 160],

    'body-max-line-length': [2, 'always', 120],

    'subject-case': [
      0,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
  },
};
