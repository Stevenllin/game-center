import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setDialogVisibleAction } from 'app/store/element/action';
import { DialogProps } from './types';

const Dialog: React.FC<DialogProps> = (props) => {
  const dialogContainerElemRef = useRef<HTMLDivElement>(null);
  const reduxDispatch = useDispatch();

  const handleCloseDialog = () => {
    if (props.onClose) props.onClose()
    reduxDispatch(setDialogVisibleAction(props.name, false));
  }

  const handleConfirmDialog = () => {
    if (props.onConfirm) props.onConfirm()
    if (props.confirmedAutoClose) handleCloseDialog()
  }

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== dialogContainerElemRef.current) {
      handleCloseDialog()
    }
  }

  return (
    <div id={props.name} className={'dialog' + (props.visible ? '--visible' : '')}>
      <div className="dialog__container" ref={dialogContainerElemRef}>
        <div className="dialog__head">
          <p className="dialog__title">
            {props.title}
          </p>
        </div>
        <div className="dialog__content">
          {props.children}
        </div>
        <div className="dialog__footer">
          {
            props.showConfirmBtn && (
              <button
                type="button"
                className="button-main"
                onClick={handleConfirmDialog}
              >
                {props.confirmBtnText}
              </button>
            )
          }
        </div>
      </div>
      <div className="dialog__backdrop" onClick={handleBackdropClick} />
    </div>
  )
}

Dialog.defaultProps = {
  confirmedAutoClose: true,
  showConfirmBtn: true,
  confirmBtnText: 'Confirm'
}

export default Dialog;
