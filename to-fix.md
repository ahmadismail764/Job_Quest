# Job Quest Django Project - Code Review & Action Items

## 🌟 What Went Well (Strengths to Maintain)

- **Environment Variable Management:** Excellent use of `python-dotenv` in `settings.py` to protect the `SECRET_KEY`, database credentials, and debug status.
- **Extending the User Model:** Correctly using a `OneToOneField` to link the custom `UserAccount` profile to Django's built-in `User` model, preserving Django's native authentication capabilities.
- **Form Handling (`commit=False`):** Proper use of `form.save(commit=False)` in views (like `add_project` and `add_award`) to attach the currently logged-in user before committing the object to the database.

---

## 🚨 Critical Security & Bug Fixes (High Priority)

### 1. Fix the IDOR Vulnerability (Insecure Direct Object Reference)

- **Issue:** `delete_job` in `app_core_users/views.py` deletes a job just by its ID, without checking if the user requesting the deletion actually owns the job. Any logged-in user can type `/delete/<id>/` and delete _any_ job.
- **Action Item:** Add an authorization check before deleting:

```python
job = get_object_or_404(Job, id=job_id)
current_user = UserAccount.objects.get(user=request.user)
if job.posted_by != current_user:
    return HttpResponseForbidden("You cannot delete this job.")
job.delete()
```

### 2. Fix Broken Form Initializations (GET vs POST)

- **Issue:** In `post_job` and `apply_for_job` (`app_jobs/views.py`), the form is immediately bound to `request.POST` even on a `GET` request. This causes the form to validate empty data and show red error messages before the user types anything.

- **Action Item:** Separate `GET` and `POST` logic:

```python
if request.method == 'POST':
    form = JobForm(request.POST)
    if form.is_valid():
        # ... save logic ...
else:
    form = JobForm() # Unbound form for GET requests
```

### 3. Implement Database Transactions for Signup

- **Issue:** In the `signup` view, if `User.objects.create_user()` succeeds but `UserAccount.objects.create()` fails, you are left with a corrupted "ghost" user in the database without a linked profile.
- **Action Item:** Wrap the creation logic inside a database transaction so that if the profile fails to create, the user creation is rolled back.

  ```python
  from django.db import transaction

  with transaction.atomic():
      user = User.objects.create_user(...)
      UserAccount.objects.create(...)
  ```

---

## 🤔 Refactoring Opportunities (Technical Debt)

### 1. Stop Reinventing the Auth Wheel

- **Issue:** `login_user` and `logout_view` are written manually. This introduces the risk of security flaws and requires unnecessary boilerplate.
- **Action Item:** Replace these with Django's built-in, highly secure class-based views (`LoginView` and `LogoutView`) from `django.contrib.auth.views`.

### 2. Remove Redundant Model Constraints

- **Issue:** Almost every field in `app_jobs/models.py` explicitly declares `null=False, blank=False`.
- **Action Item:** Remove these, as they are Django's default settings. Only add `null=True, blank=True` when a field actually needs to be optional to keep your models clean.

### 3. Fix Data Duplication in Job Applications

- **Issue:** You maintain an `Application` model with the application details, but also manually update an `applied_by` ManyToManyField on the `Job` model.
- **Action Item:** Use the `Application` model as the explicit intermediate table for the ManyToMany relationship by defining it as `ManyToManyField(..., through='Application')`. This syncs everything at the database level automatically.
