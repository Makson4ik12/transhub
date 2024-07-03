import styles from './RightMenu.module.scss'

interface IButton {
    img: string;
    state: "active" | "unactive" | "default";
    title?: string;
    onClick?: () => void;
  }

export const Button = (params: IButton) => {
    return (
      <div 
        className={
          params.state === "default" ? styles.button : 
          (params.state === "unactive" ? styles.button_unactive : styles.button_active)
        } 
        onClick={params.onClick}
        id="btn"
      >
        <img src={params.img} alt="button-img"/>
        <p>{params.title}</p>
      </div>
    );
  }