import React from 'react';
import './Button.scss';
import Spinner from '../Spinner/index';

const Button = (props) => {
  let {
    size,
    type,
    isActive,
    submit = false,
    classes,
  } = props;
  type = !type ? 'hollow' : type;
  size = !size ? 'regular' : size;
  isActive = isActive !== undefined ? isActive : false;

  const classNames = isActive
    ? `button active ${size} ${type}`
    : `button ${size} ${type}`;

  const renderButtonContent = (props) => {
    // spinner shows when isLoading is true
    if (props.isLoading) {
      return (
        <div className={isActive ? 'inline white' : 'inline'}>
          <Spinner size="small" />
        </div>
      );
    }

    if (props.icon) {
      return (
        <div className='button-with-icon'>
          {props.icon && <img src={props.icon} alt='button' />} {props.name}
        </div>
      )
    }
      return (
        <React.Fragment>
          {props.name}
        </React.Fragment>
    )
    

  };

  const classList = `${
    classes
      ? `${classNames} ${classes}`
      : `${classNames}`
  }`

  return (
    <button
      type={submit ? 'submit' : 'button'}
      id={props.id}
      className={classList}
      onClick={props.onClick}
    >
      {renderButtonContent(props)}
    </button>
  );
};

export default Button;
