import {useState, useEffect} from "react";
import GoogleMapReact from "google-map-react";

//地图组件
const Maps = ({latlng, zoom, onClick=undefined, moveable=false}) =>{
    const [key] = useState(process.env.REACT_APP_GOOGLE_MAPS_KEY);
    // console.log(latlng);
    //{lat:0, lng:0}
    const [inLatLng, setLatLng] = useState(latlng);
    const [inZoom, setZoom] = useState(zoom);

    useEffect(()=>{
        setLatLng(latlng);
    }, [latlng]);

    const handelOnClick = ({x, y, lat, lng, event}) =>{
        if (moveable){
            setLatLng({lat:lat, lng:lng});
        }
        if (onClick){
            onClick(lat, lng);
        }
    };

    return (
        <div style={{height:'300px'}}>
            <GoogleMapReact
                onClick={handelOnClick}
                bootstrapURLKeys={{key}}
                center={inLatLng}
                defaultZoom = {inZoom}
            >
                <AnyReactComponent
                    lat={inLatLng.lat}
                    lng={inLatLng.lng}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
}

const AnyReactComponent = () => {
    const markerStyle={
        border: '1px solid white',
        borderRadius: '50%',
        height: 10,
        width: 10,
        backgroundColor: 'red',
        cursor: 'pointer',
        zIndex: 10,
    };
    return (
        <div style={markerStyle}/>
    );
}

export default Maps;