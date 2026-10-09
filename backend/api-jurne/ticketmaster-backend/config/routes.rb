Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  post "/orders", to: "orders#create"
  get "/orders/:id", to: "orders#show"
  post "/orders/:id/pay", to: "orders#pay"
  post "/orders/:id/cancel", to: "orders#cancel"

  get "/tickets/:id", to: "tickets#show"
  post "/tickets/:id/check_in", to: "tickets#check_in"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
