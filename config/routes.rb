Rails.application.routes.draw do
  get 'runs/new'

  get 'runs/create'

  root 'runs#new'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
