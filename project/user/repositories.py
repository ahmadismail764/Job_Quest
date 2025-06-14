# repositories.py
from .models import Experience

class ExperienceRepository:
    @staticmethod
    def create_experience(data):
        # Example: Create an experience entry in the database
        experience = Experience.objects.create(**data)
        return experience

    @staticmethod
    def get_experience_by_id(exp_id):
        # Example: Retrieve an experience entry by ID
        return Experience.objects.get(id=exp_id)
