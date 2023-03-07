import React from 'react'
import './button.css'
import PropTypes from 'prop-types';

function Button(props) {
    function onClickHandler(e) {
        props.onClickButton(e);
    }

    return (
        <span className={'button ' + props.buttonStyle} onClick={onClickHandler}>{props.buttonLabel}</span>
    )
}

Button.defaultProps = {
    buttonLabel: 'click',
}

Button.propTypes = {
    onClickButton: PropTypes.func,
    buttonStyle: PropTypes.string,
    buttonLabel: PropTypes.string,
}

export default Button