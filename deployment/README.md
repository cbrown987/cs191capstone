## Ansible ec2 deployments. 

This directory contains all the necessary files and tools to deploy the application to ec2
It uses ansible and docker-compose to do so. Once Ansible has been downloaded on your computer
modify the hosts.ini file with the correct configurations. Then run the following command.
Ansible will then connect to ec2 and build the docker stack and deploy it. Then check if it is up and running.

\- Cooper Brown
```console
ansible-playbook -i inventory/hosts.ini playbook.yml 
```