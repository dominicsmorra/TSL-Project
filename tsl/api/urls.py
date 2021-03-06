from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import ObtainTokenView, CustomUserCreate, HelloWorldView, LogoutAndBlacklistRefreshTokenForUserView, PostCreateView, PostListView, PostDeleteView

urlpatterns = [
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('token/obtain/', ObtainTokenView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('post/create/', PostCreateView.as_view(), name='create_post'),
    path('post/list/', PostListView.as_view(), name='view_posts'),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),
    path('post/delete/<int:pk>/', PostDeleteView.as_view(), name='delete_post')
]
