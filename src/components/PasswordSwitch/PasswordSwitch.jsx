import React from 'react';
import showPassword from '../../assets/icon/eye-regular.svg';
import HidePassword from '../../assets/icon/eye-slash-regular.svg';

const PasswordSwitch = (props) => {
  const { passwordHide, setPasswordHide } = props;
  return (
    <img
      className="m-2 w-[20px] hover:cursor-pointer"
      src={passwordHide ? HidePassword : showPassword}
      alt={passwordHide ? 'HidePassword' : 'showPassword'}
      onClick={() => {
        setPasswordHide(passwordHide);
      }}
    />
  );
};

export default React.memo(PasswordSwitch);
