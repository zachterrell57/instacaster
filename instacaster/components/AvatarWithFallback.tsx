import { useState } from 'react'

type Props = {
    src: string;
    verified: boolean;
}

export default function AvatarWithFallback({ src, verified }: Props) {
    const [imgSrc, setImgSrc] = useState(src)
    return (
        <img
            className={"cast__avatar rounded-full align-middle " + (verified ? 'border-purple-main border-2' : '')}
            src={imgSrc}
            alt="cast-avatar"
            loading='lazy'
            onError={() => {
                setImgSrc('/avatar.png');
            }}
        />
    )
}