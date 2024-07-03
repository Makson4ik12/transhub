import { useContext, useState } from 'react';
import styles from './LeftMenu.module.scss'
import { MapContext } from '../../App';
import IconPeople from '../../icons/icon-person.svg'
import IconWarehouse from '../../icons/icon-warehouse.svg'
import IconTruck from '../../icons/icon-truck.svg'
import IconUnwrap from '../../icons/icon-unwrap.svg'
import IconWrap from '../../icons/icon-wrap.svg'
import { Button } from '../right-menu/Button';

interface ITableItem {
  src: string;
  alt: string;
  coords: number[];
}

const TableItem = (params: ITableItem) => {
  return (
    <tr>
      <td><img src={params.src} alt={params.alt}></img></td>
      <td>{params.coords[0].toFixed(4)}</td>
      <td>{params.coords[1].toFixed(4)}</td>
    </tr>
  );
}

const LeftMenu = () => {
  const mapContext = useContext(MapContext);
  const [collapsed, setCollapsed] = useState(true);

    return (
      <>
        <div className={styles.left_menu} style={collapsed ? {opacity: "0", width: "0"}: {}}>
          <table>
            <tbody>
              <tr>
                <th>Тип</th>
                <th>Широта</th>
                <th>Долгота</th>
              </tr>
              {mapContext.mapElements.peoples.map((item) => <TableItem src={IconPeople} alt="people" coords={item} />)}
              {mapContext.mapElements.trucks.map((item) => <TableItem src={IconTruck} alt="truck" coords={item} />)}
              {mapContext.mapElements.warehouses.map((item) => <TableItem src={IconWarehouse} alt="warehouse" coords={item} />)}
            </tbody>
          </table>
          <Button img={IconWrap} state="default" onClick={() => {setCollapsed(true)}}/>
        </div>

        <div className={styles.left_menu_collapsed} style={!collapsed ? {opacity: "0", width: "0"}: {}}>
          <div className={styles.item}>
            <img src={IconPeople} alt="people"></img>
            <div className={styles.circle}>{mapContext.mapElements.peoples.reduce((total) => total += 1, 0)}</div>
          </div>

          <div className={styles.item}>
            <img src={IconTruck} alt="truck"></img>
            <div className={styles.circle}>{mapContext.mapElements.trucks.reduce((total) => total += 1, 0)}</div>
          </div>

          <div className={styles.item}>
            <img src={IconWarehouse} alt="warehouse"></img>
            <div className={styles.circle}>{mapContext.mapElements.warehouses.reduce((total) => total += 1, 0)}</div>
          </div>

          <Button img={IconUnwrap} state="default" onClick={() => {setCollapsed(false)}}/>
        </div>
      </>
      
    );
}

export default LeftMenu;