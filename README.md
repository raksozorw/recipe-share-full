# Recipe Sharing App: "La Recette"

This is my FIRST EVER self-built application, so pardon the messiness... but it works!

## What does it do?

Quite a lot.

An example of the user journey is:

- Sign Up using Google OAuth 2.0
- View all recipes posted by any user (GET from MongoDB)
- Create their own recipe (POST to MongoDB)
- Upload a photo for their recipe (to a Google Cloud bucket, id passed to MongoDB)
- Edit their own recipes (PUT to MongoDB and reupload photo if chosen)
- Delete their recipes

## What to improve on

- Cleaner code, readability
- Better photo uploading
- Better hosting
- Improved UI/UX
- Less Bootstrap
