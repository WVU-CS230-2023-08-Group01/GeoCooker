import React, {Prototypes, Component} from 'react/addons';
import './Home.css';
import GoogleMapReact from 'google-map-react'; 

/*
Sources:
google-map-react: https://www.npmjs.com/package/google-map-react?activeTab=readme
example: http://google-map-react.github.io/google-map-react/map/main/
example source code: https://github.com/google-map-react/old-examples/blob/master/web/flux/components/examples/x_main/main_map_block.jsx
*/

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const defaultProps = {
    center: {
        lat: 0,
        lng: 0
    },
    zoom: 1
}

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
        // Important! Always set the container height explicitly
        <div id='map'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDfWvBqyov4n20fceBDlWg4lDN74-oInqc" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {/* <AnyReactComponent
                    lat={0}
                    lng={0}
                    text="My Marker"
                /> */}
            </GoogleMapReact>
        </div>
    );
  }
}
