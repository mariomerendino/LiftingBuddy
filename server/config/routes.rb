Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resource :logins, only: [:create]
  resource :token_validators, only: [:show]
  resource :users, only: [:create, :show] 
  resource :exercises, only: [:show]
  resource :user_workouts, only: [:show, :create]
  resource :user_workout_exercises, only: [:show, :create, :update]
  resource :one_rep_maxes, only: [:show]
  resource :insights, only: [:show]

end
