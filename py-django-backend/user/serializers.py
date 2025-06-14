from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserAccount, Experience, Project, Education, License, Certificate, Skill, Interest, Award


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']
        read_only_fields = ['id', 'date_joined']


class UserAccountSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    full_name = serializers.CharField(read_only=True)
    
    class Meta:
        model = UserAccount
        fields = [
            'id', 'user', 'type_job', 'company_name', 'email', 'phone_number', 
            'location', 'bio', 'profile_picture', 'experience_years', 'resume',
            'created_at', 'updated_at', 'full_name'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'full_name']


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            'id', 'company', 'position', 'description', 'start_date', 
            'end_date', 'is_current'
        ]
        read_only_fields = ['id']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'technologies', 'url', 
            'github_url', 'start_date', 'end_date'
        ]
        read_only_fields = ['id']


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = [
            'id', 'degree_type', 'field_of_study', 'institution', 
            'start_year', 'end_year', 'gpa', 'description'
        ]
        read_only_fields = ['id']


class LicenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = License
        fields = [
            'id', 'title', 'issuing_organization', 'issue_date', 
            'expiration_date', 'credential_id', 'credential_url'
        ]
        read_only_fields = ['id']


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = [
            'id', 'title', 'issuing_organization', 'issue_date', 
            'expiration_date', 'credential_id', 'credential_url'
        ]
        read_only_fields = ['id']


class SkillSerializer(serializers.ModelSerializer):
    level_display = serializers.CharField(source='get_level_display', read_only=True)
    
    class Meta:
        model = Skill
        fields = [
            'id', 'name', 'level', 'level_display', 'years_of_experience'
        ]
        read_only_fields = ['id', 'level_display']


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ['id', 'title', 'since']
        read_only_fields = ['id']


class AwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Award
        fields = [
            'id', 'name', 'description', 'issuing_organization', 
            'date_received', 'url'
        ]
        read_only_fields = ['id']


class UserProfileSerializer(serializers.ModelSerializer):
    """Complete user profile with all related data"""
    user = UserSerializer(read_only=True)
    experiences = ExperienceSerializer(many=True, read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)
    education = EducationSerializer(many=True, read_only=True)
    licenses = LicenseSerializer(many=True, read_only=True)
    certificates = CertificateSerializer(many=True, read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    interests = InterestSerializer(many=True, read_only=True)
    awards = AwardSerializer(many=True, read_only=True)
    full_name = serializers.CharField(read_only=True)
    
    class Meta:
        model = UserAccount
        fields = [
            'id', 'user', 'type_job', 'company_name', 'email', 'phone_number', 
            'location', 'bio', 'profile_picture', 'experience_years', 'resume',
            'created_at', 'updated_at', 'full_name', 'experiences', 'projects',
            'education', 'licenses', 'certificates', 'skills', 'interests', 'awards'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'full_name']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password_confirm']
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        # Create UserAccount
        UserAccount.objects.create(
            user=user,
            email=validated_data['email'],
            type_job='job_seeker'
        )
        return user
