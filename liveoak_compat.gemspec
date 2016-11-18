$:.push File.expand_path('../lib', __FILE__)

# Maintain your gem's version:
require 'liveoak_compat/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name = 'liveoak_compat'
  s.version = LiveoakCompat::VERSION
  s.authors = ['Ben Kimball']
  s.email = 'ben@liveoak.net'
  s.homepage = 'https://github.com/liveoaktech/liveoak-compat'
  s.license = 'MIT'
  s.summary = 'System Compatibility Test that ensures javascript, actioncable, socket.io are compatible within a firewall.'

  s.files = Dir['{app,config,db,lib}/**/*', 'MIT-LICENSE', 'Rakefile', 'README.rdoc']
  s.test_files = Dir['test/**/*']

  s.required_rubygems_version = '> 2.3.1'

  s.add_dependency 'rails', '~> 5.0', '>= 5.0.0.1'

  s.add_dependency 'sass-rails', '~> 5.0'
  s.add_dependency 'redis', '~> 3.0'
  s.add_dependency 'listen', '~> 3.0', '>= 3.0.5'
  s.add_dependency 'pg', '~> 0'
  s.add_dependency 'jquery-rails', '~> 4.2', '>= 4.2.1'
end
