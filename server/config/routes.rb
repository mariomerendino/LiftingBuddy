Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resource :logins, only: [:create]
  resource :token_validators, only: [:show]
  resource :users, only: [:create, :show] 
  resource :exercises, only: [:show]
end
