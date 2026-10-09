class TicketsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_ticket, only: [:show, :check_in]

  # GET /tickets/:id
  def show
    render json: @ticket
  end


  # POST /tickets/:id/check-in
  def check_in

    @ticket.with_lock do
      if @ticket.status == "used"
        return render json: {
          error: "Ticket has already been used"
        }, status: :unprocessable_entity
      end

      unless @ticket.status == "ready"
        return render json: {
          error: "Ticket is not valid for check-in"
        }, status: :unprocessable_entity
      end

      @ticket.update!(status: "used")
    end


    render json: {
      message: "Ticket checked in successfully",
      ticket: @ticket
    }
  end


  private

  def set_ticket
    @ticket = Ticket.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Ticket not found" }, status: :not_found
  end
end