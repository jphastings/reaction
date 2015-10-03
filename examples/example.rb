require 'therubyracer'
require './js_logger'

cxt = V8::Context.new
cxt['console'] = JSLogger.new
cxt.load('../dist/ComponentRenderer.js')

cr = cxt.eval('ComponentRenderer')

p cr.render('CommentBox', {})