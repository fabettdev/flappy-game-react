import React, { Component } from 'react'
import background from '../assets/images/background.png';
import middleground from '../assets/images/midground.png';

export default class Background extends Component {
    constructor(props) {
        super(props);

        this.contextRef = React.createRef()
        this.middlegroundRef = React.createRef()
        this.backgroundRef = React.createRef()

        this.canvas = null
        this.ctx = null
        this.canvasWidth = null
        this.canvasHeight = null

        this.middlegroundElement = null
        this.backgroundElement = null

        this.x = 0
        this.x2 = 960
        this.movSpeed = 2
        this.x3 = 0
        this.x4 = 288
        this.movSpeed1 = 1
        //this.image = props.image
    }

    componentDidMount() {
        this.canvas = this.contextRef.current
        this.ctx = this.canvas.getContext('2d')
        this.canvasWidth = this.canvas.width = 500
        this.canvasHeight = this.canvas.height = 256
        this.middlegroundElement = this.middlegroundRef.current
        this.backgroundElement = this.backgroundRef.current

        this.animateMiddleground()
    }

    componentDidUpdate() {
    }

    animateMiddleground = () => {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        //BACK
        if (this.x < -960) {
            this.x = 960 - this.movSpeed + this.x2
        } else {
            this.x -= this.movSpeed
        }
        if (this.x2 < -960) {
            this.x2 = 960 - this.movSpeed + this.x
        } else {
            this.x2 -= this.movSpeed
        }
        //MIDDLE
        if (this.x3 < -288) {
            this.x3 = 288 - this.movSpeed1 + this.x4
        } else {
            this.x3 -= this.movSpeed1
        }
        if (this.x4 < -288) {
            this.x4 = 288 - this.movSpeed1 + this.x3
        } else {
            this.x4 -= this.movSpeed1
        }

        this.ctx.drawImage(this.backgroundElement, this.x3, 0)
        this.ctx.drawImage(this.backgroundElement, this.x4, 0)
        this.ctx.drawImage(this.middlegroundElement, this.x, 0)
        this.ctx.drawImage(this.middlegroundElement, this.x2, 0)

        requestAnimationFrame(this.animateMiddleground)
    }

    componentWillUnmount() { }

    render() {
        return (
            <canvas ref={this.contextRef}>
                <img src={background} ref={this.backgroundRef}></img>
                <img src={middleground} ref={this.middlegroundRef}></img>
            </canvas>
        )
    }
}
