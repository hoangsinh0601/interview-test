import { useMemo } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const Problem3: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Type any cannot be used for blockchain
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return (
      balances
        .filter((balance: WalletBalance) => {
          const balancePriority = getPriority(balance.currency);
          // lhsPriority is undefined replace with balancePriority
          //The filtering logic is incorrect. It should filter out balances with a priority less than -99 and an amount greater than 0.
          if (balancePriority < -99) {
            if (balance.amount >= 0) {
              return true;
            }
          }
          return false;
        })
        //Sorting is done on every render due to the dependency on balances and prices. This can be optimized by memoizing the sorting logic.
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          // There is no block chain in the WalletBalance type change with amount
          const leftPriority = getPriority(lhs.amount);
          const rightPriority = getPriority(rhs.amount);
          return rightPriority - leftPriority;
        })
    );
  }, [balances, prices]);

  // The formattedBalances array is created but not used. Instead, the sortedBalances array is used directly in the rows mapping. remove formattedBalances
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        // WalletRow is not defined
        <WalletRow
          // classes is undefined
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};

// No export default
export default Problem3;
