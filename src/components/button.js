import React, { useLayoutEffect, useRef, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import { useMobile } from 'hooks'
import styles from './button.module.css'

const Button = ({ label, link, style, activeColor = 'white', idleColor = 'black', disabled}) => {
  const buttonRef = useRef()
  const isMobile = useMobile()
  const [hovering, toggleHover] = useState(false)

  const [dimensions, setDimensions] = useState({})
  const [perimeter, setPerimeter] = useState(0)

  useLayoutEffect(() => {
    setDimensions({
      width: buttonRef.current.offsetWidth,
      height: buttonRef.current.offsetHeight
    })
    setPerimeter(buttonRef.current.offsetWidth * 2 + buttonRef.current.offsetHeight * 2)
  }, [buttonRef.current])

  const labelStyle = {
    color: hovering ? activeColor : idleColor
  }

  if (isMobile) labelStyle.borderColor = idleColor

  const drawStroke = useSpring({
    stroke: hovering ? activeColor : idleColor,
    strokeDashoffset: hovering ? 0 : perimeter,
    strokeDasharray: perimeter,
    ...dimensions
  })

  if (disabled) {
    return (
      <div className={styles.container} style={style}>
        <div
          ref={buttonRef}
          className={styles.labelDisabled}
          style={labelStyle}
        >
          <animated.svg className={styles.stroke} style={drawStroke}>
            <rect width='100%' height='100%' />
          </animated.svg>
          {label.toUpperCase()}
        </div>
      </div>
    )
  } else {
    return (
      <animated.div className={styles.container} style={style}>
        <a
          ref={buttonRef}
          className={styles.label}
          style={labelStyle}
          onMouseEnter={() => (isMobile ? {} : toggleHover(true))}
          onMouseLeave={() => toggleHover(false)}
          href={link}
          target='_blank'
          rel='noopener noreferrer external'
        >
          <animated.svg className={styles.stroke} style={drawStroke}>
            <rect width='100%' height='100%' />
          </animated.svg>
          {label.toUpperCase()}
        </a>
      </animated.div>
    )
  }
}

export default Button
