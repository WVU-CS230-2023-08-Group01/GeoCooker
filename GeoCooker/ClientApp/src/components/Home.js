import React, { Component } from 'react';
import GoogleMap from './Map/GoogleMap'
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import myPlaces from './Map/myPlaces';
import './Home.css';
import { getRecipeResource } from "../Services/message.service";


/*
Sources:
google-map-react: https://www.npmjs.com/package/google-map-react?activeTab=readme
example: http://google-map-react.github.io/google-map-react/map/main/
example source code: https://github.com/google-map-react/old-examples/blob/master/web/flux/components/examples/x_main/main_map_block.jsx
*/
async function logRecipes() {
    const { data, error } = await getRecipeResource();
    //console.log(data, error)
    return data;
}


const getInfoWindowString = (place) => `
    <div>
      <div style="font-size: 16px;">
        ${place.recipeName}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        ${place.rating}
        </span>
        <span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(place.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}</span>
      </div>
      <div style="font-size: 14px; color: grey;">
        ${place.location}
      </div>
      <div style="font-size: 14px; color: grey;">
        ${'$'.repeat(place.description)}
      </div>
      
    </div>`;

const handleApiLoaded = (map, maps, places) => {
    const markers = [];
    const infowindows = [];


    places.forEach((place) => {
        console.log(place.lat + ", " + place.lon)
        markers.push(new maps.Marker({
            position: {
                lat: place.lat,
                lng: place.lon,
            },
            map,
        }));

        infowindows.push(new maps.InfoWindow({
            content: getInfoWindowString(place),
        }));
    });

    markers.forEach((marker, i) => {
        marker.addListener('click', () => {
            infowindows[i].open(map, marker);
        });
    });
};

const defaultProps = {
    center: {
        lat: 25,
        lng: 0
    },
    zoom: 1
}

const MyMapMarker = ({ id, title }) => (
    <Link key={id} to={`/recipes/${id}`}>
        <div className='marker'>
            <span className='markerTitle'>{title}</span>
        </div>
    </Link>
);

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);

        this.state = {
            places: [],
        };
    }

    

    componentDidMount() {
        let data = logRecipes();
        const jsonD = () => {
            data.then((a) => {
                console.log(a)
                this.setState({places: a})
            });
        };
        jsonD();
    }

    render() {
        const { places } = this.state;


        return (
            <>
                {
                    <div id='map'>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyDfWvBqyov4n20fceBDlWg4lDN74-oInqc" }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                            yesIWantToUseGoogleMapApiInternals={true}
                            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places)}
                        >

                            {myPlaces.map((dataItem) => (
                                <MyMapMarker
                                    key={dataItem.id}
                                    id={dataItem.id}
                                    lat={dataItem.lat}
                                    lng={dataItem.lng}
                                    title={dataItem.title}
                                />
                            ))}

                        </GoogleMapReact>
                    </div>
                }
            </>
        );
    }
}
