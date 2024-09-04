import classNames from 'classnames';
import React, { useMemo, useCallback } from 'react';

enum Blockchain {
  Osmosis = 'Osmosis',
  Ethereum = 'Ethereum',
  Arbitrum = 'Arbitrum',
  Zilliqa = 'Zilliqa',
  Neo = 'Neo',
}

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain | string;
}

interface Props extends BoxProps {
  className?: string;
  style?: React.CSSProperties;
}

const blockchainPriorities: Record<Blockchain | string, number> = {
  [Blockchain.Osmosis]: 100,
  [Blockchain.Ethereum]: 50,
  [Blockchain.Arbitrum]: 30,
  [Blockchain.Zilliqa]: 20,
  [Blockchain.Neo]: 20,
};

const isBlockchain = (value: string): value is Blockchain =>
  Object.values(Blockchain).includes(value as Blockchain);

const getPriority = (blockchain: string): number =>
  isBlockchain(blockchain) ? blockchainPriorities[blockchain] : -99;

const filterValidBalances = ({ amount, blockchain }: WalletBalance) =>
  amount > 0 && getPriority(blockchain) > -99;

const sortBalancesByPriority = (firstBalance: WalletBalance, secondBalance: WalletBalance) =>
  getPriority(secondBalance.blockchain) - getPriority(firstBalance.blockchain);

const generateKey = (currency: string, blockchain: string) => `${currency}-${blockchain}`;

const MemoizedWalletRow = React.memo(WalletRow);

const WalletPage: React.FC<Props> = ({ className, style }: Props) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(
    () => balances.filter(filterValidBalances).sort(sortBalancesByPriority),
    [balances],
  );

  const renderRow = useCallback(
    ({ currency, amount, blockchain }: WalletBalance) => {
      const formattedAmount = amount.toFixed(2);
      const usdValue = (prices?.[currency] ?? 0) * amount;

      return (
        <MemoizedWalletRow
          className={classNames('wallet-row', className)}
          key={generateKey(currency, blockchain)}
          amount={amount}
          usdValue={usdValue}
          formattedAmount={formattedAmount}
        />
      );
    },
    [prices, className],
  );

  const rows = sortedBalances.map(renderRow);

  return (
    <div className={classNames('wallet-page', className ?? 'default-class')} style={style ?? {}}>
      {rows}
    </div>
  );
};
