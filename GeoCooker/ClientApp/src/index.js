import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter} from "react-router-dom";



const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
    <BrowserRouter basename={baseUrl}>
        <Auth0Provider
            domain="dev-hnosbuofym3q3o0u.us.auth0.com"
            clientId="1ztfRZxvtolyBbnbLyNyIZzO1IUM14h9"
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: "https://geocooker/auth/0/api",
                //scope: "read:current_user write:Recipe"
            }}
        >

            <App />

        </Auth0Provider>
    </BrowserRouter>

);


//root.render(
//    <Auth0Provider
//        domain="dev-hnosbuofym3q3o0u.us.auth0.com"
//        clientId="1ztfRZxvtolyBbnbLyNyIZzO1IUM14h9"
//        authorizationParams={{
//            redirect_uri: window.location.origin
//        }}
//        >
//        <App />
//    </Auth0Provider>,
//  //<BrowserRouter basename={baseUrl}>
//  //  <App />
//    //</BrowserRouter>
//);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
