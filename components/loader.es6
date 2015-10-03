/**
 * TODO: Find a way to do this automatically which is detectable
 * by webpack (so all components are inserted) but doesn't blow
 * up when actually run. This is harder than it seems; I've had
 * difficulty with require.context, which looks like it'd be the
 * right thing.
 */ 

export default {
  CommentBox: require('./CommentBox'),
  HomePage: require('./HomePage'),
  WelcomeHeader: require('./WelcomeHeader')
};