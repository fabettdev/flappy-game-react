import React from 'react'
import './button.css'

function Button(props) {
    return (
        <a href={props.buttonLink}>
            <input
                type='button'
                value={props.buttonLabel}
                className={props.buttonStyle}
                onClick={props.callback}
                placeholder={props.buttonPlaceholder}
            />
        </a>
    )
}

export default Button