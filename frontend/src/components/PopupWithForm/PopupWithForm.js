function PopupWithForm ({name, isOpen, onClose, titleClass, title, onSubmit, buttonText, children}) {
  return (
    <div className={`popup popup-${name} ${isOpen ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <button className="popup__exite" onClick={onClose} type="button">
        </button>
        <form className={`popup__form popup__form-${name}`} name={`${name}-form`} onSubmit={onSubmit}>
          <h2 className={`popup__form-name ${titleClass}`}>{title}</h2>
          {children}
          <button className={`popup__sumbit popup__sumbit-${name}`} type="submit">{buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
