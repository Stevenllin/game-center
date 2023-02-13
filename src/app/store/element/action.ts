import { DialogNamesEnum } from 'app/core/enum/element/dialog';
import { ELEMENTS_DIALOGS__SET_DIALOG_VISIBLE, DialogDataState, ElementActions } from './types';

/**
 * @description [Dialogs]
*/
 export const setDialogVisibleAction = (name: DialogNamesEnum, visible: boolean, data?: DialogDataState): ElementActions => ({
  type: ELEMENTS_DIALOGS__SET_DIALOG_VISIBLE,
  payload: { name, visible, data }
});
  