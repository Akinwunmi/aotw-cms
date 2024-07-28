module.exports = {
  root: true,
  overrides: [
    {
      files: [
        '*.ts'
      ],
      parserOptions: {
        project: ['tsconfig.(eslint|spec).json']
      },
      extends: [
        '@aotw/eslint-config',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates'
      ],
      plugins: [
        'change-detection-strategy',
        'import',
        'rxjs'
      ],
      rules: {
        '@angular-eslint/component-class-suffix': [
          'error',
          {
            'suffixes': ['Component']
          }
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            'type': 'attribute',
            'prefix': 'aotw',
            'style': 'camelCase'
          }
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            'type': 'element',
            'prefix': ['app', 'aotw-lib'],
            'style': 'kebab-case'
          }
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            'argsIgnorePattern': '^_',
            'ignoreRestSiblings': true
          }
        ],
        '@typescript-eslint/no-use-before-define': [
          'warn',
          {
            'functions': false,
            'classes': false,
            'variables': true
          }
        ],
        'change-detection-strategy/on-push': 'error',
        'max-len': [
          'error',
          {
            'code': 100
          }
        ],
        'max-lines': [
          'error',
          {
            'max': 240
          }
        ],
        'rxjs/no-nested-subscribe': 'error'
      }
    },
    {
      files: [
        '*.html'
      ],
      extends: [
        'plugin:@angular-eslint/template/recommended',
        'plugin:@angular-eslint/template/accessibility'
      ],
      rules: {
        'max-len': [
          'error',
          {
            'code': 100
          }
        ],
        'max-lines': [
          'error',
          {
            'max': 240
          }
        ],
      }
    }
  ]
}
