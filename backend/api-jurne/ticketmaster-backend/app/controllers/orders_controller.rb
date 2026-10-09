
class OrdersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_order, only: [:show, :pay, :cancel]

  # POST /orders
  def create

    Order.transaction do
      @order = current_user.orders.create!(
        event_id: params[:event_id],
        status: "pending",
        total: 0
      )

      params[:items].each do |item|
        ticket_type = TicketType.find(item[:ticket_type_id])
        quantity = Integer(item[:quantity], 10)

        raise ArgumentError, "Quantity must be greater than zero" unless quantity > 0

        @order.order_items.create!(
          ticket_type: ticket_type,
          quantity: quantity,
          unit_price: ticket_type.price
        )
      end

      @order.update!(
        total: @order.order_items.sum do |item|
          item.quantity * item.unit_price
        end
      )
    end

    render json: @order, status: :created

    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Ticket type not found" }, status: :not_found
    rescue ArgumentError, TypeError => e
      render json: { error: e.message }, status: :unprocessable_entity

  end
  # GET /orders/:id
  def show
    render json: @order
  end

  # POST /orders/:id/pay
  def pay
    @order.with_lock do
      raise ArgumentError, "Order is not pending" unless @order.status == "pending"

      order_items = @order.order_items.to_a
      ticket_types = order_items.map(&:ticket_type).uniq.sort_by(&:id)

      ticket_types.each(&:lock!)

      order_items.each do |item|
        ticket_type = item.ticket_type
        available = ticket_type.quantity_total - ticket_type.quantity_sold

        raise ArgumentError, "Not enough tickets available" if item.quantity > available
      end

      order_items.each do |item|
        ticket_type = item.ticket_type

        ticket_type.update!(
          quantity_sold: ticket_type.quantity_sold + item.quantity
        )

        item.quantity.times do
          @order.tickets.create!(
            ticket_type: ticket_type,
            owner_id: @order.user_id,
            status: "ready",
            qr_code: SecureRandom.uuid
          )
        end
      end

      @order.update!(status: "paid")
    end

    render json: @order, status: :ok

  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  rescue ArgumentError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  # POST /orders/:id/cancel
  def cancel
    @order.with_lock do
      raise ArgumentError, "Order is not pending" unless @order.status == "pending"

      @order.update!(status: "cancelled")
    end

    render json: @order, status: :ok

  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  rescue ArgumentError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  private

  def set_order
    @order = current_user.orders.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Order not found" }, status: :not_found
  end
end