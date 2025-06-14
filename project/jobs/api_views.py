from rest_framework import generics, filters, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from .models import Job, Company, Application
from .serializers import JobSerializer, JobListSerializer, CompanySerializer, ApplicationSerializer


@api_view(['GET'])
def api_root(request, format=None):
    """
    API Root - Lists all available endpoints
    """
    return Response({
        'jobs': reverse('jobs_api:job-list-create', request=request, format=format),
        'job_stats': reverse('jobs_api:job-stats', request=request, format=format),
        'companies': reverse('jobs_api:company-list', request=request, format=format),
        'applications': reverse('jobs_api:application-list-create', request=request, format=format),
    })


class JobListCreateView(generics.ListCreateAPIView):
    """
    GET: List all jobs with filtering
    POST: Create a new job
    """
    queryset = Job.objects.filter(is_active=True).select_related('company')
    serializer_class = JobListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['job_type', 'experience_level', 'is_remote', 'company']
    search_fields = ['title', 'description', 'company__name', 'location']
    ordering_fields = ['created_at', 'salary_min', 'salary_max']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return JobSerializer
        return JobListSerializer


class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Retrieve job details
    PUT/PATCH: Update job
    DELETE: Delete job
    """
    queryset = Job.objects.select_related('company')
    serializer_class = JobSerializer


class CompanyListView(generics.ListAPIView):
    """
    GET: List all companies
    """
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'industry', 'location']
    ordering = ['name']


class CompanyDetailView(generics.RetrieveAPIView):
    """
    GET: Retrieve company details with jobs
    """
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


@api_view(['GET'])
def company_jobs(request, pk):
    """Get all jobs for a specific company"""
    company = get_object_or_404(Company, pk=pk)
    jobs = Job.objects.filter(company=company, is_active=True)
    serializer = JobListSerializer(jobs, many=True)
    return Response(serializer.data)


class ApplicationListCreateView(generics.ListCreateAPIView):
    """
    GET: List user's applications
    POST: Apply to a job
    """
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            user_account = getattr(self.request.user, 'useraccount', None)
            if user_account:
                return Application.objects.filter(applicant=user_account)
        return Application.objects.none()

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            user_account = getattr(self.request.user, 'useraccount', None)
            if user_account:
                serializer.save(applicant=user_account)


@api_view(['GET'])
def job_stats(request):
    """Get job statistics"""
    stats = {
        'total_jobs': Job.objects.filter(is_active=True).count(),
        'total_companies': Company.objects.count(),
        'jobs_by_type': {},
        'jobs_by_level': {},
    }
    
    # Jobs by type
    for job_type, label in Job.JOB_TYPE_CHOICES:
        count = Job.objects.filter(job_type=job_type, is_active=True).count()
        stats['jobs_by_type'][job_type] = {'label': label, 'count': count}
    
    # Jobs by experience level
    for level, label in Job.EXPERIENCE_LEVEL_CHOICES:
        count = Job.objects.filter(experience_level=level, is_active=True).count()
        stats['jobs_by_level'][level] = {'label': label, 'count': count}
    
    return Response(stats)
