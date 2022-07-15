import { useState } from 'react'

type Props = {
    src: string;
}

export default function AvatarWithFallback({ src }: Props) {
    const [imgSrc, setImgSrc] = useState(src)
    return (
        <img
            className="cast__avatar rounded-full align-middle"
            src={imgSrc}
            alt="cast-avatar"
            loading='lazy'
            onError={() => {
                setImgSrc('/avatar.png');
            }}
        />
    )
}