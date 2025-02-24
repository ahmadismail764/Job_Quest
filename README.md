# Job_Quest

## Project Overview

Job Quest is a job application platform designed to help users search for job listings, apply for positions, and manage applications efficiently. The platform provides both job seekers and employers with an intuitive interface to interact with job postings.

## Features

- **User Authentication**: Sign up, log in, and manage profiles.
- **Job Listings**: View available job postings with detailed descriptions.
- **Application Management**: Apply for jobs and track application status.
- **Employer Dashboard**: Employers can post new job listings and review applicants.
- **Search & Filter**: Users can search for jobs based on criteria such as category, location, and type.

## Installation

To set up the project locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- Python 3
- Django

### Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/job_quest.git
   cd job_quest
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Apply database migrations:

   ```bash
   python manage.py migrate
   ```

5. Run the development server:

   ```bash
   python manage.py runserver
   ```

6. Access the application at `http://127.0.0.1:8000/`

## Usage

- **Job Seekers**: Register, search for jobs, and submit applications.
- **Employers**: Create job listings, manage applications, and interact with candidates.
- **Admin Panel**: Access Django's admin panel at `/admin/` with superuser credentials.

## Tech Stack

- **Back-end**: Django (Python)
- **Front-end**: HTML, CSS, JavaScript
- **Version Control**: Git & GitHub

## Contributors

- **[@ahmadismail764](https://github.com/ahmadismail764)**
- **[@abdoahmed100](https://github.com/abdoahmed100)**
- **[@BelalHendi](https://github.com/BelalHendi)**
- **[@mozidan12](https://github.com/mozidan12)**
- **[@zzzeinhom](https://github.com/zzzeinhom)**

Feel free to update the contributors' section with the actual names and GitHub profiles of your team members!
