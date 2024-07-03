import './App.css';
import "leaflet/dist/leaflet.css";
import MapView, { IMapElement, IMapElements } from './components/map-view/MapView';
import RightMenu from './components/right-menu/RightMenu';
import React, { useState } from 'react';
import LeftMenu from './components/left-menu/LeftMenu';

interface IMapContext extends IMapElement {
  setMapElements: React.Dispatch<React.SetStateAction<IMapElements>>;
  setMapElement: React.Dispatch<React.SetStateAction<IMapElement>>;
  mapElements: IMapElements
}

export const MapContext = React.createContext<IMapContext>({
  mapElement: "none", 
  mapElements: {trucks: [], peoples: [], warehouses: []}, 
  setMapElements: () => {},  
  setMapElement: () => {}
});

function App() {
  const [mapElements, setMapElements] = useState<IMapElements>(
    {trucks: [], peoples: [], warehouses: []}
  );
  const [mapElement, setMapElement] = useState<IMapElement>(
    {mapElement: "none"}
  );

  return (
    <div className="app">
      <MapContext.Provider value={{
        mapElement: mapElement.mapElement,
        mapElements: mapElements,
        setMapElements: setMapElements,
        setMapElement: setMapElement,
      }}>
        <LeftMenu />
        <MapView />
        <RightMenu />
      </MapContext.Provider>
    </div>
  );
}

export default App;
