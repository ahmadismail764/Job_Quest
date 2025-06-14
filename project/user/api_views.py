from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import UserAccount, Experience, Project, Education, License, Certificate, Skill, Interest, Award
from .serializers import (
    UserAccountSerializer, UserProfileSerializer, UserRegistrationSerializer,
    ExperienceSerializer, ProjectSerializer, EducationSerializer,
    LicenseSerializer, CertificateSerializer, SkillSerializer,
    InterestSerializer, AwardSerializer
)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register(request):
    """User registration endpoint"""
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.id,
            'username': user.username,
            'email': user.email
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login(request):
    """User login endpoint"""
    username = request.data.get('username')
    password = request.data.get('password')
    
    if username and password:
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            user_account = getattr(user, 'useraccount', None)
            return Response({
                'token': token.key,
                'user_id': user.id,
                'username': user.username,
                'email': user.email,
                'user_type': user_account.type_job if user_account else 'job_seeker'
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout(request):
    """User logout endpoint"""
    try:
        request.user.auth_token.delete()
        return Response({'message': 'Logged out successfully'})
    except:
        return Response({'error': 'Error logging out'}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(generics.RetrieveUpdateAPIView):
    """Get and update user profile"""
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        user_account, created = UserAccount.objects.get_or_create(
            user=self.request.user,
            defaults={'email': self.request.user.email}
        )
        return user_account


class UserDashboardView(generics.RetrieveAPIView):
    """Get user dashboard data"""
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        user_account, created = UserAccount.objects.get_or_create(
            user=self.request.user,
            defaults={'email': self.request.user.email}
        )
        return user_account
    
    def get(self, request, *args, **kwargs):
        user_account = self.get_object()
        profile_data = UserProfileSerializer(user_account).data
        
        # Add application data
        from jobs.models import Application
        from jobs.serializers import ApplicationSerializer
        applications = Application.objects.filter(applicant=user_account)
        
        response_data = {
            'profile': profile_data,
            'applications': ApplicationSerializer(applications, many=True).data,
            'stats': {
                'total_applications': applications.count(),
                'experiences_count': user_account.experiences.count(),
                'projects_count': user_account.projects.count(),
                'skills_count': user_account.skills.count(),
            }
        }
        
        return Response(response_data)


# Individual resource views for user profile components
class ExperienceListCreateView(generics.ListCreateAPIView):
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user_account = getattr(self.request.user, 'useraccount', None)
        if user_account:
            return Experience.objects.filter(user_account=user_account)
        return Experience.objects.none()
    
    def perform_create(self, serializer):
        user_account = getattr(self.request.user, 'useraccount', None)
        if user_account:
            serializer.save(user_account=user_account)


class ExperienceDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user_account = getattr(self.request.user, 'useraccount', None)
        if user_account:
            return Experience.objects.filter(user_account=user_account)
        return Experience.objects.none()


class ProjectListCreateView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user_account = getattr(self.request.user, 'useraccount', None)
        if user_account:
            return Project.objects.filter(user_account=user_account)
        return Project.objects.none()
    
    def perform_create(self, serializer):
        user_account = getattr(self.request.user, 'useraccount', None)
        if user_account:
            serializer.save(user_account=user_account)


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user_account = getattr(self.request.user, 'useraccount', None)
        if user_account:
            return Project.objects.filter(user_account=user_account)
        return Project.objects.none()


# Similar views for other models (Education, License, Certificate, Skill, Interest, Award)
# Following the same pattern...

@api_view(['GET'])
def api_overview(request):
    """API overview for user endpoints"""
    return Response({
        'auth': {
            'register': '/api/auth/register/',
            'login': '/api/auth/login/',
            'logout': '/api/auth/logout/',
        },
        'user': {
            'profile': '/api/user/profile/',
            'dashboard': '/api/user/dashboard/',
            'experiences': '/api/user/experiences/',
            'projects': '/api/user/projects/',
        }
    })
