import React from 'react'
import './button.css'

function Button(props) {
    return (
        <span className={props.buttonStyle} onClick={props.callback}>{props.buttonLabel}</span>
    )
}

export default Button