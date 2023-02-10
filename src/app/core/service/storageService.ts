import { StorageDefines, StorageItem } from 'app/core/model/storage';
import { StorageKeysEnum, StorageTypesEnum } from 'app/core/enum/storage';

/**
 * @description set Item
*/
const setItem = (key: StorageKeysEnum, value: string) => {
  switch (StorageDefines[key]) {
    case StorageTypesEnum.Local:
      localStorage.setItem(key, value);
      break;
    case StorageTypesEnum.Session:
      sessionStorage.setItem(key, value);
      break;
  }
};

/**
 * @description 取得儲存值
*/
const getItem = (key: StorageKeysEnum) => {
  switch (StorageDefines[key]) {
    case StorageTypesEnum.Local:
      return localStorage.getItem(key);
    case StorageTypesEnum.Session:
      return sessionStorage.getItem(key);
  }
};

/* eslint-disable-next-line import/no-anonymous-default-export */
export default {
  setItem,
  getItem
};
