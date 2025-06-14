# repositories.py
from .models import Exper

class ExperienceRepository:
    @staticmethod
    def create_experience(data):
        # Example: Create an experience entry in the database
        experience = Exper.objects.create(**data)
        return experience

    @staticmethod
    def get_experience_by_id(exp_id):
        # Example: Retrieve an experience entry by ID
        return Exper.objects.get(id=exp_id)
