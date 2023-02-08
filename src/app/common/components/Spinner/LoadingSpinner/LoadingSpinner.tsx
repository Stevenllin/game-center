import React, { useEffect } from 'react';
import { LoadingSpinnerProps } from './types';
import './styles.scss';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = (props) => {
  /**
   * @description 執行鎖定視窗 Scroll Bar 的 Effect
   */
  useEffect(() => {
    lockWindowScrollBar(props.visible);
    return () => { lockWindowScrollBar(false); };
  }, [props.visible]);

  /**
   * @description 鎖定視窗 Scroll Bar
   * @param lockup 是否鎖定
   */
  const lockWindowScrollBar = (lockup: boolean) => {
    const isLockup = lockup ? 'hidden' : 'auto';
    document.getElementsByTagName('body')[0].style.overflow = isLockup;
  };

  return props.visible
    ? (
      <div className="loading-spinner">
        <div className="loading-spinner__ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
      )
    : null;
};

export default LoadingSpinner;
