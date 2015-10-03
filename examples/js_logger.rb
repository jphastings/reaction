require 'logger'

class JSLogger
  def initialize(logger = Logger.new(STDOUT))
    @logger = logger
  end

  def info(*objs)
    do_log(:info, *objs)
  end
  alias :log :info

  def warn(*objs)
    do_log(:warn, *objs)
  end

  def error(*objs)
    do_log(:error, *objs)
  end

  private

  def do_log(level, *objs)
    @logger.send(level, sprintf(*objs.map(&:to_s)))
  end
end