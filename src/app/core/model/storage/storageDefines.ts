import { StorageKeysEnum, StorageTypesEnum } from 'app/core/enum/storage';

/**
 * @description Storage defines
 */
export const StorageDefines: Readonly<Record<StorageKeysEnum, StorageTypesEnum>> = {
  /** Navigation */
  [StorageKeysEnum.Navigation]: StorageTypesEnum.Session,
};
