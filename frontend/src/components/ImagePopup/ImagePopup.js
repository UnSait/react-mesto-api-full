function ImagePopup(props) {

  const { card, onClose } = props

  return(
    <div className={`popup popup_full-Screen ${card.isOpen ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <button className="popup__exite" onClick={onClose} type="button">
        </button>
        <div className="popup__place-container">
          <img className="popup__place-photo" src={card.link} alt={card.name}/>
          <h2 className="popup__place-name">{card.name}</h2>
        </div>
      </div>
    </div>
  )
}

export default ImagePopup
