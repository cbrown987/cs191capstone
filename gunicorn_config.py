# Gunicorn configuration file for production
bind = "0.0.0.0:5328"
workers = 4  # Generally (2 x num_cores) + 1
worker_class = "sync"
max_requests = 1000
timeout = 30
keepalive = 5
errorlog = "gunicorn-error.log"
accesslog = "gunicorn-access.log"
loglevel = "info"