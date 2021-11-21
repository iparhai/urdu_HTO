import React from 'react';
import './drag.css'
import { Stage, Layer, Text } from 'react-konva';
import { useEffect } from 'react';
// import fishSplash from './assets/sounds/fishSplash.wav'
import './NumberLineMove.css'
import sessionData from '../utils/sessionData';
import useImage from 'use-image';
import { min } from 'moment';
import cartR_H from '../assets/cartR_H.png'
import cartR_T from '../assets/cartR_T.png'
import cartR_O from '../assets/cartR_O.png'

import cartL_H from '../assets/cartL_H.png'
import cartL_T from '../assets/cartL_T.png'
import cartL_O from '../assets/cartL_O.png'
import learnHTO from './HTOLearn'
import "./HTO.css"
import arrowR from '../assets/arrow.gif'
import arrowL from '../assets/arrowL.gif'
import { getLearn } from './Quiz';
const HTO = (props) => {
    const [cartLeft, setCartLeft] = React.useState(window.innerWidth / 2 - window.innerWidth / 6)
    const [cartTop, setCartTop] = React.useState(0)
    const [step, setStep] = React.useState(200)
    const [image, setImage] = React.useState(cartR_H)
    const imageRef = React.useRef()
    const [hto] = React.useState("H")
    const [carMaxWidth, setCarMaxWidth] = React.useState(500)
    const [usedClick, setUsedClicks] = React.useState(0)
    const [clickCSS, setClickCSS] = React.useState(false)
    const [arrow, setArrow] = React.useState(arrowR)
    var cartStyle = {
        move: {
            position: "absolute",
            left: cartLeft + "px",
            top: cartTop + "px",
            marginTop: "62vh",
            width: "100%",
            maxWidth: carMaxWidth + "px",
            "pointer-events": getLearn() ? "none" : "unset"
        },
        click: {
            position: "absolute",
            left: cartLeft + "px",
            top: cartTop + "px",
            marginTop: "62vh",
            width: "100%",
            maxWidth: carMaxWidth + "px",

        }
    }
    useEffect(() => {
        if (image == cartR_H || image == cartL_H) {
            props.setAnswer(0)
        }
        else if (image == cartR_T || image == cartL_T) {
            props.setAnswer(1)
        }
        else {
            props.setAnswer(2)
        }
    }, [image])

    useEffect(() => {
        setCartLeft(cartLeft)
    }, [step])
    useEffect(() => {
        if (step >= 0 && usedClick == 0) {
            setImage(cartR_H)
            setArrow(arrowR)
        }
        else if (step >= 0 && usedClick == 1) {
            setImage(cartR_T)

        }
        else if (step >= 0 && usedClick == 2) {
            setImage(cartR_O)

        }
        else if (step < 0 && usedClick == 0) {
            setImage(cartL_O)
            setArrow(arrowL)

        }
        else if (step < 0 && usedClick == 1) {
            setImage(cartL_T)

        }
        else if (step < 0 && usedClick == 2) {
            setImage(cartL_H)

        }
    }, [usedClick])
    useEffect(() => {
        if (props.learn) {
            setTimeout(() => {
                learnHTO(imageRef, "", props.correctAnswer, props.number, () => props.callCorrectAnswer(), 0)

            }, 2000)

        }
        checkResize()

        window.addEventListener("resize", checkResize);
        return () => {
            window.removeEventListener("resize", checkResize)
        }
    }, [])
    const checkResize = () => {
        setCartLeft(window.innerWidth / 2 - window.innerWidth / 6)
        setCarMaxWidth(window.innerWidth / 5)
        setCartLeft((window.innerWidth / 2 - window.innerWidth / 5) + (step * usedClick))
        setStep(window.innerWidth / 10)
    }
    const toggleClass = () => {
        setClickCSS(!clickCSS)
    }

    return (
        <div>
            {props.learn && console.log("on learning mode")}
            <div >
                <img alt="cart" src={image} className="Cart" style={cartStyle.move} ref={imageRef} onClick={() => {

                    console.log(usedClick)
                    if (usedClick >= 1) {

                        setStep(step * -1)
                        setUsedClicks(0)
                    }
                    else {
                        setUsedClicks(usedClick + 1)
                    }
                    setCartLeft(cartLeft + step)
                }} />
                <img alrt="arror" className="Cart" src={arrow} style={{
                    position: "absolute",
                    left: cartLeft + carMaxWidth / 2 + "px",
                    top: cartTop + "px",
                    marginTop: "59vh",
                    width: "100%",
                    maxWidth: carMaxWidth / 8 + "px",
                    "pointer-events": getLearn() ? "none" : "unset"
                }} onClick={() => {

                    console.log(usedClick)
                    if (usedClick >= 1) {

                        setStep(step * -1)
                        setUsedClicks(0)
                    }
                    else {
                        setUsedClicks(usedClick + 1)
                    }
                    setCartLeft(cartLeft + step)
                }} />
            </div>
            {!props.learn &&
                <button class="glow-on-hover" type="button" style={{ fontSize: carMaxWidth / 20, position: "absolute", top: window.innerHeight / 3, left: window.innerWidth / 2 }} onClick={() => { props.onClick() }} > <i className="fa fa-paper-plane fa-3x"/></button>
            }
        </div>
    );
};
export default HTO;

// <div className="noselect parentDiv" >

// <div className="dropBox"
//     ref={container}
// >
//     <Stage
//         width={stageWidth}
//         height={stageHeight}
//         ref={stageRef}
//     >
//         <Layer>
//             {chSet.map((chObject, index) => {
//                 return <RenderCharacter chObject={chObject} handleClick={() => {
//                     if (blanks.length == 1 && blanks[0] != "?") return;
//                     let temp = [...blanks]
//                     temp[temp.length - 1] = chObject.ch
//                     setAnswer(chObject.ch)
//                     setBlanks(temp)
//                 }} />
//             })}
//         </Layer>
//     </Stage>
// </div>
// <div >
//     {blanks.map((item, index) => {
//         return (
//             <h1 onClick={() => {

//                 setBlanks(
//                     ["?"]
//                 )
//                 setAnswer("")
//             }}>
//                 <u>{item}</u> &nbsp;
//             </h1>
//         )
//     })}
// </div>
// <button className="App-link" onClick={() => {
//     props.onClick()
// }}> <i class="fa fa-paper-plane" aria-hidden="true"></i> </button>
// </div >
