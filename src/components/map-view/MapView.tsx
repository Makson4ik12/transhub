import styles from './MapView.module.scss'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { MapContext } from '../../App';
import { useContext } from 'react';
import { PointTuple, icon } from 'leaflet';
import IconTruck from '../../icons/icon-truck.svg'
import IconPeople from '../../icons/icon-person.svg'
import IconWarehouse from '../../icons/icon-warehouse.svg'

export interface IMapElements {
  trucks: [number, number][];
  peoples: [number, number][];
  warehouses: [number, number][];
}

export interface IMapElement {
  mapElement: "none" | "truck" | "people" | "warehouse";
}

interface IMapMarker {
  title: string;
  position: [number, number];
  icon: any;
  onClickHandler: () => void;
}

const mapIconSize: PointTuple = [48, 48];

const TruckIcon = icon({
  iconUrl: IconTruck,
  iconSize: mapIconSize
});

const PeopleIcon = icon({
  iconUrl: IconPeople,
  iconSize: mapIconSize
});

const WarehouseIcon = icon({
  iconUrl: IconWarehouse,
  iconSize: mapIconSize
});

export const DrawRoutes = (routes: object) => {
  
}

const MapMarker = (params: IMapMarker) => {
  return (
    <Marker 
      position={params.position} 
      icon={params.icon}
      eventHandlers={{
        contextmenu: params.onClickHandler
      }}
    >
      <Popup minWidth={90}>{params.title}</Popup>
    </Marker>
  );
}

const MapMarkers = () => {
  const mapContext = useContext(MapContext);

  const map = useMapEvents({
    click(e) {        
      switch(mapContext.mapElement) {
        case "truck":
          mapContext.setMapElements({
            ...mapContext.mapElements, trucks: [...mapContext.mapElements.trucks, [e.latlng.lat, e.latlng.lng]]
          });
          break;
        
        case "people":
          mapContext.setMapElements({
            ...mapContext.mapElements, peoples: [...mapContext.mapElements.peoples, [e.latlng.lat, e.latlng.lng]]
          });
          break;
          
        case "warehouse":
          mapContext.setMapElements({
            ...mapContext.mapElements, warehouses: [...mapContext.mapElements.warehouses, [e.latlng.lat, e.latlng.lng]]
          });
          break;
      }                          
    },
    contextmenu(e) {
      
    },           
  })

  return (
    <>
      {mapContext.mapElements.trucks.map((item) => 
        <MapMarker position={item} title="Курьер" icon={TruckIcon} onClickHandler={() => 
          mapContext.setMapElements({
            ...mapContext.mapElements, trucks: [...(mapContext.mapElements.trucks.filter((i) => i !== item))]
          })
        } />
      )}

      {mapContext.mapElements.peoples.map((item) => 
        <MapMarker position={item} title="Человек" icon={PeopleIcon} onClickHandler={() => 
          mapContext.setMapElements({
            ...mapContext.mapElements, peoples: [...(mapContext.mapElements.peoples.filter((i) => i !== item))]
          })
        } />
      )}
      
      {mapContext.mapElements.warehouses.map((item) => 
        <MapMarker position={item} title="Склад" icon={WarehouseIcon} onClickHandler={() => 
          mapContext.setMapElements({ 
            ...mapContext.mapElements, warehouses: [...(mapContext.mapElements.warehouses.filter((i) => i !== item))]
          })
        } />
      )}
    </>
  );
}

const MapView = () => {
  return (
    <div className={styles.map_view}>
      <MapContainer 
        center={[51.505, -0.09]} 
        zoom={13} 
        zoomControl={false}
        scrollWheelZoom={true} 
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapMarkers />
      </MapContainer>
    </div>
  );
}

export default MapView;