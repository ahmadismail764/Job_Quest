from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from jobs.models import Company, Job
from user.models import UserAccount


class Command(BaseCommand):
    help = 'Create sample data for testing the API'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample data...')

        # Create sample companies
        companies_data = [
            {
                'name': 'Google',
                'description': 'Search engine and technology company',
                'website': 'https://google.com',
                'industry': 'Technology',
                'size': '5000+',
                'location': 'Mountain View, CA',
                'founded': '1998',
                'rating': 4.5
            },
            {
                'name': 'Microsoft',
                'description': 'Software and cloud computing company',
                'website': 'https://microsoft.com',
                'industry': 'Technology',
                'size': '5000+',
                'location': 'Redmond, WA',
                'founded': '1975',
                'rating': 4.4
            },
            {
                'name': 'OpenAI',
                'description': 'Artificial intelligence research company',
                'website': 'https://openai.com',
                'industry': 'AI/Machine Learning',
                'size': '201-500',
                'location': 'San Francisco, CA',
                'founded': '2015',
                'rating': 4.7
            },
        ]

        companies = []
        for comp_data in companies_data:
            company, created = Company.objects.get_or_create(
                name=comp_data['name'],
                defaults=comp_data
            )
            companies.append(company)
            if created:
                self.stdout.write(f'Created company: {company.name}')

        # Create sample jobs
        jobs_data = [
            {
                'title': 'Senior Software Engineer',
                'company': companies[0],  # Google
                'description': 'Build scalable systems and APIs for millions of users.',
                'location': 'Mountain View, CA',
                'requirements': ['Python', 'Django', 'JavaScript', 'React', '5+ years experience'],
                'salary_min': 150000,
                'salary_max': 220000,
                'job_type': 'full_time',
                'experience_level': 'senior',
                'years_of_experience': 5,
                'is_remote': False,
                'tags': ['Python', 'Django', 'React', 'Backend']
            },
            {
                'title': 'Frontend Developer',
                'company': companies[1],  # Microsoft
                'description': 'Create beautiful and responsive user interfaces.',
                'location': 'Remote',
                'requirements': ['JavaScript', 'React', 'TypeScript', '3+ years experience'],
                'salary_min': 90000,
                'salary_max': 140000,
                'job_type': 'full_time',
                'experience_level': 'mid',
                'years_of_experience': 3,
                'is_remote': True,
                'tags': ['JavaScript', 'React', 'TypeScript', 'Frontend']
            },
            {
                'title': 'Machine Learning Engineer',
                'company': companies[2],  # OpenAI
                'description': 'Work on cutting-edge AI models and research.',
                'location': 'San Francisco, CA',
                'requirements': ['Python', 'TensorFlow', 'PyTorch', 'PhD preferred'],
                'salary_min': 180000,
                'salary_max': 300000,
                'job_type': 'full_time',
                'experience_level': 'senior',
                'years_of_experience': 4,
                'is_remote': False,
                'tags': ['Python', 'AI', 'Machine Learning', 'Research']
            },
            {
                'title': 'Full Stack Developer Intern',
                'company': companies[0],  # Google
                'description': 'Learn and contribute to full-stack development projects.',
                'location': 'Mountain View, CA',
                'requirements': ['Basic programming knowledge', 'Willingness to learn'],
                'salary_min': 6000,
                'salary_max': 8000,
                'job_type': 'internship',
                'experience_level': 'entry',
                'years_of_experience': 0,
                'is_remote': False,
                'tags': ['Internship', 'Full Stack', 'Learning']
            },
        ]

        # Create default user for posted_by field
        default_user, created = User.objects.get_or_create(
            username='admin',
            defaults={'email': 'admin@example.com', 'is_staff': True}
        )
        if created:
            default_user.set_password('admin123')
            default_user.save()

        default_user_account, created = UserAccount.objects.get_or_create(
            user=default_user,
            defaults={'type_job': 'employer', 'email': 'admin@example.com'}
        )

        for job_data in jobs_data:
            job_data['posted_by'] = default_user_account
            job, created = Job.objects.get_or_create(
                title=job_data['title'],
                company=job_data['company'],
                defaults=job_data
            )
            if created:
                self.stdout.write(f'Created job: {job.title} at {job.company.name}')

        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created sample data: '
                f'{Company.objects.count()} companies, '
                f'{Job.objects.count()} jobs'
            )
        )
