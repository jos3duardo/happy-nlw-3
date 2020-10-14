import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import mapIcon from "../utils/mapIcon";


import mapMarkerImg from '../images/map-marker.svg';

import api from "../services/api";
import '../styles/pages/orphanages-map.css'

interface Orphanage {
	id: number,
	latitude: number,
	longitude: number,
	name: string
}
function OrganagesMap() {
	const [orphanages, setOrphanages] = useState<Orphanage[]>([])
	
	useEffect(() => {
		api.get('orphanages').then(response => {
			setOrphanages(response.data)
		})
	}, [])
  return (
    <div id="page-map">
      <aside>
        <header>
            <img src={mapMarkerImg} alt="Happy"/>
            <h2>Escolha um orfanato no mapa</h2>
            <p>Muitas crianças estão esperando <a href=""></a>sua visita :)</p>
        </header>
        <footer>
            <strong>Campo Grande</strong>
            <span>Mato Grosso do Sul</span>
        </footer>
      </aside>

	    <Map
		    center={[-20.4916172,-54.6693676]}
		    zoom={15}
		    style={{ width: '100%', height: '100%'}}
	    >
		    {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />*/}
		    <TileLayer
			    url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
		    />
		
		    {
		    	orphanages.map(orphanage => {
		    		return (
					    <Marker
						    icon={mapIcon}
						    position={[orphanage.latitude,orphanage.longitude]}
						    key={orphanage.id}
					    >
						    <Popup closeButton={false} minWidth={248} maxWidth={248} className="map-popup">
							    {orphanage.name}
							    <Link to={`/orphanages/${orphanage.id}`}>
								    <FiArrowRight size={20} color="FFF" />
							    </Link>
						    </Popup>
					    </Marker>
				    )
			    })
		    }
	    </Map>
	    
	    <Link to="/orphanages/create" className="create-orphanage">
		    <FiPlus size={32} color="#FFF"/>
	    </Link>
    </div>
  )
}

export default OrganagesMap