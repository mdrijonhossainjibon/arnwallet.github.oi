import React from 'react'
import { constants } from 'helpers'
import CSSModules from 'react-css-modules'
import styles from './Coin.scss'
import web3Icons from 'images'
import CurrencyIcon, { currencyIcons } from 'components/ui/CurrencyIcon/CurrencyIcon'
import config from 'app-config'

const isDark = localStorage.getItem(constants.localStorage.isDark)

const defaultCurrencyColors = {
  'btc': 'orange',
  'btc (multisig)': 'orange',
  'btc (sms-protected)': 'orange',
  'btc (pin-protected)': 'orange',
  'usdt': '#33a681',
  'ghost': 'black',
  'next': 'white',
}

type CoinProps = {
  className?: string
  size?: number
  name: string
}

const Coin = (props: CoinProps) => {
  const {
    size = 40,
    className, 
    name,
  } = props

  const isIconExist = currencyIcons.includes(name.toLowerCase())
  const iconSource = web3Icons[name]
  let isIconConfigExist = false

  if (
    config?.erc20[name.toLowerCase()]?.icon ||
    config?.bep20[name.toLowerCase()]?.icon
  ) {
    isIconConfigExist = true
  }

  // Coin styles *************************

  const style = {
    width: size ? `${size}px` : null,
    height: size ? `${size}px` : null,
    backgroundColor: null,
  }

  if (defaultCurrencyColors[name.toLowerCase()]) {
    style.backgroundColor = defaultCurrencyColors[name.toLowerCase()]
  }

  if (config?.erc20[name.toLowerCase()]?.iconBgColor) {
    style.backgroundColor = config.erc20[name.toLowerCase()].iconBgColor
  }

  if (config?.bep20[name.toLowerCase()]?.iconBgColor) {
    style.backgroundColor = config.bep20[name.toLowerCase()].iconBgColor
  }

  // *************************************

  let currencyIconProps = {
    name: name.toLowerCase(),
    styleName: '',
    style: {},
    source: iconSource,
  }

  if (isIconExist || isIconConfigExist) {
    currencyIconProps.styleName = 'icon'
  } else {
    currencyIconProps.styleName = 'letter'
    currencyIconProps.style = {
      lineHeight: `${size}px`,
      fontSize: `${size / 2}px`,
    }
  }

  return (
    <div 
      styleName={`
        coin
        ${isDark ? 'dark' : ''}
        ${iconSource ? 'noColors' : ''}
      `}
      className={className}
      //@ts-ignore: strictNullChecks
      style={style}
    >
      <CurrencyIcon {...currencyIconProps} />
    </div>
  )
}

export default CSSModules(Coin, styles, { allowMultiple: true })
