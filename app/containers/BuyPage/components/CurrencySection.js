// @flow
import React, { PureComponent } from 'react';
// import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Icons from '../../../components/CryptoIcons';
import { Line } from '../../../components/placeholder';
import { floor } from '../utils';
import getConfig from '../../../utils/config';
import CoinSelectable from './CoinSelectable';

const debug = require('debug')('dicoapp:containers:BuyPage:CurrencySection');

const config = getConfig();
const COIN_BASE = config.get('marketmaker.tokenconfig');
const symbol = COIN_BASE.coin;
const Icon = Icons[symbol];
const icon = (
  <Icon
    style={{
      width: 32,
      height: 32
    }}
  />
);
const line = (
  <Line
    width={60}
    style={{
      margin: 0
    }}
  />
);

const styles = () => ({});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object
};

class CurrencySection extends PureComponent<Props> {
  static defaultProps = {};

  render() {
    debug(`render`);
    const { balance } = this.props;
    const b = balance.get(symbol);
    if (!b) {
      // not found in balance
      return (
        <CoinSelectable
          key={`baseCoin${symbol}`}
          selected
          data={symbol}
          icon={icon}
          title={COIN_BASE.name}
          subTitle={line}
        />
      );
    }
    return (
      <CoinSelectable
        key={`baseCoin${symbol}`}
        selected
        data={symbol}
        icon={icon}
        title={COIN_BASE.name}
        subTitle={`${floor(b.get('balance'), 3)} ${b.get('coin')}`}
        {...this.props}
      />
    );
  }
}

CurrencySection.displayName = 'CurrencySection';

export default withStyles(styles)(CurrencySection);
