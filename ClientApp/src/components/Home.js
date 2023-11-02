import React, { Component } from 'react';
import GoogleMap from './Map/GoogleMap'
import GoogleMapReact from 'google-map-react';
import Marker from './Map/Marker';
import './Home.css';

import myMarker from './Map/myMarker';

/*
Sources:
google-map-react: https://www.npmjs.com/package/google-map-react?activeTab=readme
example: http://google-map-react.github.io/google-map-react/map/main/
example source code: https://github.com/google-map-react/old-examples/blob/master/web/flux/components/examples/x_main/main_map_block.jsx
*/

const getInfoWindowString = (place) => `
    <div>
      <div style="font-size: 16px;">
        ${place.name}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        ${place.rating}
        </span>
        <span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(place.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}</span>
      </div>
      <div style="font-size: 14px; color: grey;">
        ${place.types[0]}
      </div>
      <div style="font-size: 14px; color: grey;">
        ${'$'.repeat(place.price_level)}
      </div>
      <div style="font-size: 14px; color: green;">
        ${place.opening_hours.open_now ? 'Open' : 'Closed'}
      </div>
    </div>`;

const handleApiLoaded = (map, maps, places) => {
    const markers = [];
    const infowindows = [];

    places.forEach((place) => {
        markers.push(new maps.Marker({
            position: {
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
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
        lat: 0,
        lng: 0
    },
    zoom: 1
}

const AnyReactComponent = ({ text }) => 
    <div class='custom2'>
        {text}
    </div>;

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
      super(props);
  
      this.state = {
        places: [],
      };
    }
  
    componentDidMount() {
      fetch('./Map/places.json')
        .then((response) => response.json())
        .then((data) => {
          data.results.forEach((result) => {
            result.show = false; // eslint-disable-line no-param-reassign
          });
          this.setState({ places: data.results });
        });
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

                <AnyReactComponent
                  // Buffalo, United States
                  lat={42.54}
                  lng={-78.51}
                />
                <AnyReactComponent
                  // Wakayama, Japan
                  lat={34.14}
                  lng={135.10}
                />
                <AnyReactComponent
                  // Ushuaia, Argentina
                  lat={-54.48}
                  lng={-68.18}
                />
                <AnyReactComponent
                  // Nuorgam, Finland
                  lat={70.05}
                  lng={27.53}
                />
                <AnyReactComponent
                  // Novi Sad, Serbia
                  lat={45.15}
                  lng={19.51}
                />
                <AnyReactComponent
                  // San Sebastián, Spain
                  lat={43.19}
                  lng={-2.00}
                />
                <AnyReactComponent
                  // Iqaluit, Canada
                  lat={63.45}
                  lng={-68.31}
                />
                <AnyReactComponent
                  // Craiova, Romania
                  lat={44.20}
                  lng={23.49}
                />
                <AnyReactComponent
                  // Port-au-Prince, Haiti
                  lat={18.32}
                  lng={-72.20}
                />
                <AnyReactComponent
                  // Puntarenas, Costa Rica
                  lat={9.58}
                  lng={-84.50}
                />

                {places.map((place) => (
                  <Marker
                    key={place.id}
                    text={place.name}
                    lat={place.geometry.location.lat}
                    lng={place.geometry.location.lng}
                  />
                ))}

                {/* {places.map((place) => (
                  <myMarker
                    key={place.id}
                    text={place.name}
                    lat={place.geometry.location.lat}
                    lng={place.geometry.location.lng}
                  />
                ))} */}

              </GoogleMapReact>
            </div>
          }
        </>
      );
    }
}