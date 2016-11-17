$:.push File.expand_path("../lib", __FILE__)
require File.expand_path('../lib/liveoak_compat/version', __FILE__)
require 'rails'
require 'sass-rails'
require 'redis'
require 'listen'
require 'pg'
require 'jquery-rails'

require 'liveoak_compat/version'


Gem::Specification.new do |s|
  s.name = 'liveoak-compat'
  s.authors = ['Ben Kimball']
  s.email = 'ben@liveoak.net'
  s.homepage = 'https://github.com/liveoaktech/liveoak-compat'

  s.version = LiveoakCompat::VERSION
  s.date = '2016-11-09'
  s.summary = 'System Compatibility Test that ensures javascript, actioncable, socket.io are compatible within a firewall.'

  s.files = Dir['{app,config,db,lib}/**/*']
  s.version = '0.0.1'

  s.required_rubygems_version = '> 2.3.1'

  s.add_dependency 'rails', '~> 5.0', '>= 5.0.0.1'
  s.add_dependency 'sass-rails', '~> 5.0'
  s.add_dependency 'redis', '~> 3.0'
  s.add_dependency 'listen', '~> 3.0', '>= 3.0.5'
  s.add_dependency 'pg', '~> 0'
  s.add_dependency 'jquery-rails', '~> 4.2', '>= 4.2.1'
end


