export type GenericCast = {
  body: CastBody;
  meta: CastMeta;
  merkleRoot: string;
  uri: string;
};

type CastBody = {
  publishedAt: number;
  username: string;
  data: CastData;
};

type CastData = {
  text?: string;
  image?: string;
  replyParentMerkleRoot?: string;
};

type CastMeta = {
  displayName?: string;
  avatar: string;
  isVerifiedAvatar?: boolean;
  reactions: {
    count: number;
    type: string;
  };
  recasts: {
    count: number;
  };
  watches: {
    count: number;
  };
  replyParentUsername?: {
    username: string;
  };
};
