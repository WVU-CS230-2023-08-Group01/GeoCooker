# Backend API

# description
this is the home of the backend API. This API uses .Net Core 5 Web API to give all data for the react frontend. The API is built with docker
compose so a the API is dockerized and ran with a SQL server in the same stack. So the API becomes very easy and cheap to host. Since it is 
built with docker clustering is a very real possibility as well as running with Nginx so reverse porxy is available as well. This Architecture of
seperating the backend compleatly is very popular and efficient. The only drawback is having to define CORS policies so the frontend can 
make requests to the backend. 

# install 
The docker compose installs default dev certs into the container so no config is required or manually creating a self signed cert. This is 
nice because it lets the user start the backend with `docker compose up` and then have a working backend. The less fun part is having to manually
trust the cert so the frontend doesn't give an Error when requesting data. Backend Database seeding also takes around 15 minutes, since it 
doesn't make sense for a pin to be in the water we use the geocoding API from google to check if the generated lat and lon make sense. Since this 
is such a brute force way to seed data it will take a minute to spin up. 

#### manually trusting Cert 

- Go to the lock and then click the connection tab 
- click the certificate is ... tab 
- export the cert to local machine
- open cert in keychain for MACOSX
- click Always Trust

now the cert will be trusted and seen the same as a signed cert from letsencrypt for example. 

### Exploring API

Easy! just go to `https://localhost/swagger`. This will bring up the API explorer showing model schemas, shows data being processes real time, etc.
This link is a fantastic debugging and learning tool!

