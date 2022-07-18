import Head from "next/head";

const Header = () => {
    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta
                property="og:image"
                content="https://instacaster.xyz/instacaster-icon.png"
            />
            <meta name="theme-color" content="#8765CC" />
            <meta property="og:image:type" content="/instacaster-icon.png" />
            <meta property="og:image:width" content="300" />
            <meta property="og:image:height" content="300" />
            <meta property="og:image" />
            <meta
                name="description"
                content='What if you just returned all casts that contained "imgur"?'
            />
            <title>Instacaster</title>
            <link rel="manifest" href="/manifest.json" />
            <link rel="icon" type="image/x-icon" href="/instacaster-icon.png" />
            <link rel="apple-touch-icon" href="/instacaster-icon.png" />
        </Head>
    );
}

export default Header;