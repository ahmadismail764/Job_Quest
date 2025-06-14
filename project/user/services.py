# services.py
from .repositories import ExperienceRepository

def process_experience(data):
    # Business logic for processing experience
    experience = ExperienceRepository.create_experience(data)
    return experience
