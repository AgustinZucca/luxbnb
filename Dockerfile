# Start with the python:3.9 image
FROM python:3.9
# Set the following enviroment variables
#
# REACT_APP_BASE_URL -> Your deployment URL
ENV REACT_APP_BASE_URL=postgres://bvexgdcxtkkhlx:1da50466e1f0998bbb1ac211200387241b7d8b2a231a86dd168b5ffae78dba31@ec2-54-227-248-71.compute-1.amazonaws.com:5432/d7ej61d14vkegj
# FLASK_APP -> entry point to your flask app
# FLASK_ENV -> Tell flask to use the production server
# SQLALCHEMY_ECHO -> Just set it to true

# Set the directory for upcoming commands to /var/www

# Copy all the files from your repo to the working directory

# Copy the built react app (it's built for us) from the  
# /react-app/build/ directory into your flasks app/static directory

# Run the next two python install commands with PIP
# install -r requirements.txt
# install psycopg2

# Start the flask environment by setting our
# closing command to gunicorn app:app
