export interface IInstagramComments {
  url: string;
  comment_user: string;
  comment_user_url: string;
  comment_date: string;
  comment: string;
  likes_number: number;
  replies_number: number;
  replies: Array<{
    likes_number: number;
    reply: string;
    reply_date: string;
    reply_user: string;
  }>;
  hashtag_comment: string | null;
  tagged_users_in_comment: string | null;
  post_url: string;
  post_user: string;
  comment_id: string;
  post_id: string;
}

export interface IInstagramProfile {
  account: string;
  fbid: string;
  id: string;
  followers: number;
  posts_count: number;
  is_business_account: boolean;
  is_professional_account: boolean;
  is_verified: boolean;
  avg_engagement: number | null;
  external_url: string | null;
  biography: string;
  business_category_name: string | null;
  category_name: string | null;
  post_hashtags: string[];
  following: number;
  posts: Array<{
    __typename: string;
    caption: string;
    comments?: number;
    datetime: string;
    id: string;
    image_url: string;
    likes?: number;
    url: string;
    carousel_media_urls?: Array<{ image_url: string }>;
  }>;
  profile_image_link: string;
  profile_url: string | null;
  profile_name: string;
  highlights_count: number;
  highlights: Array<{
    id: string;
    image: string;
    owner: string;
    title: string;
  }>;
  full_name: string;
  is_private: boolean | null;
  bio_hashtags: string[] | null;
  url: string | null;
  is_joined_recently: boolean | null;
  has_channel: boolean | null;
  partner_id: string | null;
}

export interface IInstagramReels {
  url: string;
  user_posted: string;
  description: string;
  hashtags: string[];
  num_comments: number;
  date_posted: string;
  likes: number;
  views: number;
  video_play_count: number;
  top_comments: Array<{
    comment: string;
    date_of_comment: string;
    likes: number | null;
    num_replies: number;
    replies: any[];
    user_commenting: string;
  }>;
  post_id: string;
  thumbnail: string;
  shortcode: string;
  content_id: string;
  product_type: string;
  coauthor_producers: any[];
  tagged_users: any[];
  length: string;
  video_url: string;
  audio_url: string;
}


/**
 * The snapshot_id, is the id of the snapshot to monitor from bright data
 * It will allow us to retrieve the data once the processing is completed
 */
export interface IInstagramBrightDataResponse {
  snapshot_id: string;
}

