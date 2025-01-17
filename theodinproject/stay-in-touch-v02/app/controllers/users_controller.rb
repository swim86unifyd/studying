class UsersController < ApplicationController
  before_action :authenticate_user!, only: %i[show index]

  def index
    @users = User.paginate(page: params[:page], per_page: 10)
    @friendships = current_user.friendships
    @inverse_friendships = current_user.inverse_friendships
  end

  def show
    @user = User.find(params[:id])
    @posts = @user.posts.ordered_by_most_recent
  end
end
