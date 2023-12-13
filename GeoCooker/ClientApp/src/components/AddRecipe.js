import React, { useState, useEffect } from 'react';
import RecipeForm from './RecipeForm';


const AddRecipe = () => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [showForm, setShowForm] = useState(false);

    const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    // Check for location permission
    if ('geolocation' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        if (permissionStatus.state === 'granted') {
         navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          });
          setLocationPermission(true);
          setShowForm(true);
        } else {
          setLocationPermission(false);
        }
      });
    } else {
      setLocationPermission(false);
    }
  }, []);

  const handleEnableLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Permission granted
        setLocationPermission(true);
        setShowForm(true);
      },
      () => {
        // Permission denied
        setLocationPermission(false);
        setShowForm(false);
      }
    );
  };

  if (!locationPermission) {
    return (
      <div className="container">
        <div className="mt-5">
          <p>Location permission is not enabled.</p>
          <p>Please enable location services to continue: Geocooker only uses location to place recipe.</p>
          <p>Don't worry! We also move marker randomly from current location so no one will know your actual address!</p>
          <br></br>
          <p>To enable location services, look at the Adress bar and to the far left click the preference button</p>
          <p>Click enable on location and refresh page!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {showForm ? (
        <div>
          < RecipeForm latitude={latitude} longitude={longitude} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AddRecipe;
