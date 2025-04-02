import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";

interface ConnectButtonProps {
  buttonClassName?: string;
}

export const ConnectButton = ({ buttonClassName }: ConnectButtonProps) => {
  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className={
                      buttonClassName ||
                      "bg-secondary rounded-lg p-4 font-bold text-white uppercase h-14 w-40"
                    }
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    className={
                      buttonClassName ||
                      "bg-secondary rounded-lg p-4 font-bold text-white uppercase h-14 w-40"
                    }
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    className={
                      buttonClassName ||
                      "bg-secondary rounded-lg p-4 font-bold text-white uppercase h-14 w-40"
                    }
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};
