# GeoCooker

![alt text](https://scidata.nyc3.cdn.digitaloceanspaces.com/GeoCooker/GKinlineBLACK.png)

GeoCooker is a website that makes finding new food easy. The idea is that if you want Indian food the user can easily scroll to the country of India and find recipes from local people. The authenticity is top notch, real recipes from real people in a certain geographical area. This app not only is fun when the user wants to mix up their cuisine but also shows how food differs region to region. GeoCooker focuses on making the addidtion of recipes extreamly easy, first log in, go to AddRecipes, fill out the form, and hit submit! GeoCooker will automatically get your current location (If Location Permissions are Enabled) and then publish the recipe within half a mile of your current location. Privacy is key so GeoCooker automatically randomly moves your location so no angry visits will happen! 

Language: ASP.Net Core API 5 with react front end\
C#, JS, HTML, CSS\
NPM: Node/React Package Manager\
Bootstrap: CSS framework\
Docker: True\
Runs with docker-compose\
Database: SQL Server\
Code first approach for minimal manual table building \
Swagger for API calls


# Install
To install this project on your local machine decide if you would rather run code in VScode or Visual Studio.\
VScode is the lighter weight option and recommended for front end devs. The drawback is less scaffolding options and less debugging tools are available. As well as having to install ASP.Net Core separately. 
Visual Studio is a very heavyweight IDE that comes with a slew of languages and support. ASP.Net Core included. 

For both options create a new project in the desired location on drive. Open the terminal in the location you want the project to be stored. \

```
git clone https://github.com/WVU-CS230-2023-08-Group01/GeoCooker.git
```

This above command should clone all project files. \

### Requirements to run 

###### Running Full Project

Docker desktop will be needed to run and compile the project with .Net API. This means if backend API calls and database fetching is required to test your portion of code, run with:

```
docker-compose up
```

If running in VS Code many more dependencies will need to be installed. 

###### Running only Frontend

If you want to run the project and test only the look and feel of the app, run using NPM. If React.js is not installed navigate to their site and follow installation instructions for your given OS. Once react is installed navigate to Client App root folder and run the following command in terminal, 

```
npm start
```

This will start a local webserver using your localhost IP. The terminal will display the port and IP of your now hosted web app. Will be something like: `https://localhost:44461/`. Stop the app using Ctrl+C. Live reload should be available. 

## Installing NPM packages

Navigate to the ClientApp directory and open terminal. Use:

```
NPM i {Package}
```

Then import the package in the component. 
