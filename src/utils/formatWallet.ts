function formatWallet(wallet: string) {
  return wallet.slice(0, 5) + "..." + wallet.slice(-6);
}

export { formatWallet };
