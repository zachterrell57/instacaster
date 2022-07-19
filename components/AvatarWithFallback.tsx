import { useState } from 'react'

type Props = {
    src: string;
    verified: boolean;
}

export default function AvatarWithFallback({ src, verified }: Props) {
    const [imgSrc, setImgSrc] = useState(src)
    return (
        <img
            className={"h-8 max-h-8 w-8 max-w-avatar cast__avatar rounded-full align-middle " + (verified ? 'border-purple-main border-2' : '')}
            src={imgSrc}
            alt="cast-avatar"
            onError={() => {
                setImgSrc('/avatar.png');
            }}
        />
    )
}