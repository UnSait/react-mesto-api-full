function InfoTooltip({info, icon, isOpen, onClose}) {
  return (
    <div className={`popup popup__info-tooltip ${isOpen ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <button className="popup__exite" onClick={onClose} type="button">
        </button>
        <div className="popup__form">
          <img className="popup__info-tooltip-icon" src={icon}/>
          <h2 className="popup__info-tooltip-text">{info}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
