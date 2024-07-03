import styles from './RightMenu.module.scss'
import IconPeople from '../../icons/icon-person.svg'
import IconWarehouse from '../../icons/icon-warehouse.svg'
import IconTruck from '../../icons/icon-truck.svg'
import IconClear from '../../icons/icon-clear.svg'
import IconStart from '../../icons/icon-start.svg'
import IconStop from '../../icons/icon-stop.svg'
import IconCancel from '../../icons/icon-cancel.svg'
import IconExport from '../../icons/icon-export.svg'
import IconImport from '../../icons/icon-import.svg'
import IconHelp from '../../icons/icon-help.svg'
import IconMore from '../../icons/icon-more.svg'
import { useContext, useState } from 'react'
import { MapContext } from '../../App'
import { cancelExecution, startExecution, stopExecution } from '../../server-api/server-api'
import { DrawRoutes } from '../map-view/MapView'
import { Button } from './Button'

interface IStartButton {
  state: "start" | "stop" | "continue";
}

const RightMenu = () => {
  const [restartButtonVisibility, setRestartButtonVisibility] = useState(false);
  const [startButtonContext, setStartButtonContext] = useState<IStartButton>({state: "start"});
  const [moreMenuVisibility, setMoreMenuVisibility] = useState(false);
  const [menuButton, setMenuButton] = useState("none");
  const mapContext = useContext(MapContext);

  const startButtonHandler = () => {
    switch (startButtonContext.state) {
      case "start":
        setStartButtonContext({state: "stop"});
        startExecution({
          trucks: mapContext.mapElements.trucks, 
          peoples: mapContext.mapElements.peoples, 
          warehouses: mapContext.mapElements.warehouses, 
          responseCallback: DrawRoutes
        });
        break;
      ;

      case "continue":
        setStartButtonContext({state: "stop"});
        startExecution({
          trucks: mapContext.mapElements.trucks, 
          peoples: mapContext.mapElements.peoples, 
          warehouses: mapContext.mapElements.warehouses, 
          responseCallback: DrawRoutes
        });
        break;
      ;

      case "stop":
        setStartButtonContext({state: "continue"});
        stopExecution({responseCallback: () => {}});
        break;
      ;
    }

    if (restartButtonVisibility === false) setRestartButtonVisibility(true);
  }

  return (
    <div className={styles.right_menu}>
      <div className={styles.menu}>
        <Button 
          img={IconPeople} 
          title="Клиент" 
          state={menuButton === "people" ? "active": "default"}
          onClick={() => {
            mapContext.mapElement === "people" ? 
            mapContext.setMapElement({mapElement: "none"}) 
            : mapContext.setMapElement({mapElement: "people"});
            setMenuButton(prevState => prevState === "people" ? "none" : "people");
          }}
        />
        <Button 
          img={IconWarehouse} 
          title="Склад" 
          state={menuButton === "warehouse" ? "active": "default"}
          onClick={() => {
            mapContext.mapElement === "warehouse" ?
            mapContext.setMapElement({mapElement: "none"}) 
            : mapContext.setMapElement({mapElement: "warehouse"});
            setMenuButton(prevState => prevState === "warehouse" ? "none" : "warehouse");
          }}
        />
        <Button 
          img={IconTruck} 
          title="Курьер" 
          state={menuButton === "truck" ? "active": "default"}
          onClick={() => {
            mapContext.mapElement === "truck" ? 
            mapContext.setMapElement({mapElement: "none"}) 
            : mapContext.setMapElement({mapElement: "truck"});
            setMenuButton(prevState => prevState === "truck" ? "none" : "truck");
          }}
        />
        <Button 
          img={IconClear} 
          state={ (mapContext.mapElements.peoples.length > 0 || 
            mapContext.mapElements.warehouses.length > 0 || 
            mapContext.mapElements.trucks.length > 0) ? "default" : "unactive" }
          onClick={() => {
            mapContext.setMapElements({peoples: [], trucks: [], warehouses: []})
          }}
        />
      </div>

      <div className={styles.menu}>
        <Button 
          img={(startButtonContext.state === "start" || startButtonContext.state === "continue") ? IconStart : IconStop} 
          state="default"
          onClick={() => startButtonHandler()}
        />
        <Button 
          img={IconCancel} 
          state={ restartButtonVisibility ? "default" : "unactive" }
          onClick={() => {
            setStartButtonContext({state: "start"});
            setRestartButtonVisibility(false);
            cancelExecution({responseCallback: () => {}});
          }}
        />
        <Button img={IconMore} state="default" onClick={() => setMoreMenuVisibility(prevState => !prevState)}/>
      </div>

      <div 
        className={styles.floating_menu}
        style={moreMenuVisibility ? {opacity: "1", height: "5.5vw"} : {}}
      >
        <Button img={IconExport} title="Экспорт" state="default"/>
        <Button img={IconImport} title="Импорт" state="default"/>
        <Button img={IconHelp} title="Помощь" state="default"/>
      </div>
    </div>
  );
}

export default RightMenu;