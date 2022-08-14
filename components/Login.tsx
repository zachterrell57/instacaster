import Link from 'next/link'
import { useEffect, useState } from 'react'

//interface for the props
interface Props {
    setLoggedInProps: (isLoggedIn: boolean) => void
}

const Login = ({ setLoggedInProps }: Props) => {
    const [signature, setSignature] = useState(null)
    const [address, setAddress] = useState(null)
    const [username, setUsername] = useState("")

    // Call handleLogin on mount
    useEffect(() => {
        initializeLogin()
    }
        , [])

    async function initializeLogin() {
        const res = await fetch('/api/getSignature', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (res.status === 200) {
            //get the signature from the response
            const json = await res.json()
            setAddress(json.address)
            setSignature(json.signature)
        }
    }

    async function verifySignature() {
        const res = await fetch('/api/verifySignature', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: address,
                username: username,
            })
        })
        if (res.status === 200) {
            const json = await res.json();
            console.log("Authenticated:", json.verified);
            json.verified ? setLoggedInProps(true) : setLoggedInProps(false)
        }
    }

    const verifyInFarcaster = (
        <>
            <input type="checkbox" id="login-modal" className="daisy modal-toggle" />
            <div className="daisy modal">
                <div className="modal-box flex flex-col items-center relative text-center">
                    <label htmlFor="login-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <input type="text" id='username' onChange={(e) => { setUsername(e.target.value) }} placeholder="Farcaster Username" className="input input-bordered w-full max-w-xs" required />
                    <p>Verifying my identity for Instacaster via @farcasterauth <br />
                        sig: &#91;{signature}&#93;<br />
                        https://instacaster.xyz <br />
                    </p>
                    <div className="button-containers flex flex-row">
                        <Link href="farcaster://">
                            <button className='btn btn-sm btn-primary'>Open Farcaster</button>
                        </Link>
                        <button onClick={verifySignature} className="btn btn-sm btn-primary">Verify</button>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <>
            {signature ? verifyInFarcaster : null}
        </>
    );
}

export default Login;