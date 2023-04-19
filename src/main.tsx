import {createTheme, ThemeProvider} from "@material-ui/core";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui";
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SafePalWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    SolongWalletAdapter,
    BraveWalletAdapter,
    ExodusWalletAdapter,
    CloverWalletAdapter,
    MathWalletAdapter
} from "@solana/wallet-adapter-wallets";

import {useMemo} from "react";

import {rpcHost, candyMachineId, network} from "./config";
import {AppInitializer} from "./components";
import ContamynationHome from "./components/ContamynationHome";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const theme = createTheme({
    palette: {
        type: "dark",
        secondary: {
            main: "#FFF",
        },
    },
    typography: {
        fontFamily: "Aaargh, Raleway, Arial",
    },
    overrides: {
        MuiButtonBase: {
            root: {
                justifyContent: "flex-start",
            },
        },
        MuiButton: {
            root: {
                textTransform: undefined,
                padding: "12px 16px",
            },
            startIcon: {
                marginRight: 8,
            },
            endIcon: {
                marginLeft: 8,
            },
        },
    },
});

const Main = ({}) => {
    // Custom RPC endpoint.
    const endpoint = useMemo(() => rpcHost, []);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new LedgerWalletAdapter(),
            new PhantomWalletAdapter(),
            new SafePalWalletAdapter(),
            new SlopeWalletAdapter({network}),
            new SolflareWalletAdapter({network}),
            new SolletExtensionWalletAdapter(),
            new SolletWalletAdapter(),
            new SolongWalletAdapter(),
            new BraveWalletAdapter(),
            new ExodusWalletAdapter(),
            new CloverWalletAdapter(),
            new MathWalletAdapter()
        ],
        []
    );

    return (
        <AppInitializer>
            <ThemeProvider theme={theme}>
                <ConnectionProvider endpoint={endpoint}>
                    <WalletProvider wallets={wallets} autoConnect={true}>
                        <WalletModalProvider>
                            {/*<Home candyMachineId={candyMachineId} />*/}
                            <ContamynationHome candyMachineId={candyMachineId}/>
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </ThemeProvider>
        </AppInitializer>
    );
};

export default Main;
