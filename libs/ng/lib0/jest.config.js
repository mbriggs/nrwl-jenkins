module.exports = {
  name: 'ng-lib0',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ng/lib0',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
