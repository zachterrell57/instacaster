import { GenericCast } from '../types'
import { timeSince } from '../utils'
import Image from 'next/future/image'
import AvatarWithFallback from './AvatarWithFallback'

type Props = {
    cast: GenericCast
    initImage: boolean
}

const GenericCastComponent = ({ cast, initImage }: Props) => {

    const reply = (
        <div className="w-full h-6 flex flex-col items-center justify-center content-center rounded-t-lg border-t-2 border-l-2 border-r-2 border-purple-main">
            <div className="reply-text">
                <span className="text-white text-xs">In reply to {cast.meta.replyParentUsername?.username} </span>
            </div>
        </div>
    )

    const avatar = (
        <></>
        // <AvatarWithFallback src={cast.meta.avatar} verified={cast.meta.isVerifiedAvatar} />
    )

    const image = (
        <a
            className="cast-attachment-link relative flex content-center justify-center items-center"
            href={cast.body.data.image}
        >
            <img
                loading={initImage ? 'eager' : 'lazy'}
                className="cast-attachment w-full m-0"
                src={cast.body.data.image!}
                alt=""
            />
        </a>
    )

    const username = (
        <span className="cast__username text-sm font-semibold text-dark-gray-text">{cast.body.username}</span>
    )

    const singleLike = (
        <span className="cast-likes text-sm font-semibold text-dark-gray-text pl-3">
            {cast.meta.reactions?.count} like
        </span>
    )

    const multipleLikes = (
        <span className="cast-likes text-sm font-semibold text-dark-gray-text pl-3">
            {cast.meta.reactions?.count} likes
        </span>
    )

    const singleRecast = (
        <span className="cast-recasts text-sm font-semibold text-dark-gray-text pl-3">
            {cast.meta.recasts?.count} recast
        </span>
    )

    const multipleRecasts = (
        <span className="cast-recasts text-sm font-semibold text-dark-gray-text pl-3">
            {cast.meta.recasts?.count} recasts
        </span>
    )

    const text = (
        <>
            <span className="cast__username text-sm font-semibold text-dark-gray-text">{cast.body.username}&nbsp;</span>
            <span className="cast-text break-words break-before-all text-sm text-dark-gray-text">{cast.body.data.text}</span>
        </>
    )

    const castTimeStamp = (
        <p className="cast-date mb-3 px-3 text-tiny text-slate-400 font-light">{timeSince(cast.body.publishedAt)}  AGO</p>
    )

    return (
        <div className='cast w-screen mt-4 sm:w-lg-card flex flex-col items-center bg-purple-main rounded-lg'>

            {cast.body.data.replyParentMerkleRoot ? reply : null}

            <div className="cast-body min-w-full max-w-full bg-white sm:rounded-lg sm:border sm:border-border-gray">

                <div className="user flex flex-row object-center items-center">
                    <div className="h-8 w-8 max-h-8 max-w-avatar flex mx-3 my-3">
                        {cast.meta.avatar ? avatar : null}
                    </div>
                    <div className="cast-names my-2 flex flex-col w-full">
                        {cast.body.username ? username : null}
                    </div>
                </div>

                {cast.body.data.image ? image : null}

                <div className="cast-reactions mt-2 flex flex-row">
                    <div className="likes">
                        {cast.meta.reactions?.count > 1 ? multipleLikes : singleLike}
                    </div>
                    <div className="recasts">
                        {cast.meta.recasts?.count > 1 ? multipleRecasts : singleRecast}
                    </div>
                </div>

                <div className="caption block px-3 mb-2">
                    {cast.body.data.text && cast.body.username ? text : null}
                </div>
                {castTimeStamp}
            </div>
        </div>
    );
}

export default GenericCastComponent;