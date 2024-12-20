import { IBrightDataWebhookResponse } from '@drivers/brightdata/interfaces/brightdata.interface';
import { PostContentTypeEnum } from '@social-media-content/posts/enums/post-content-type.enum';

export interface IInstagramComments extends IBrightDataWebhookResponse {
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

export interface IInstagramProfile extends IBrightDataWebhookResponse {
  account: string;
  fbid: string;
  id: string;
  followers: number;
  posts_count: number;
  is_business_account: boolean;
  is_professional_account: boolean;
  is_verified: boolean;
  avg_engagement: number | undefined;
  external_url: string[] | undefined;
  biography: string;
  business_category_name: string;
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
  profile_url: string;
  profile_name: string;
  highlights_count: number;
  highlights: Array<{
    id: string;
    image: string;
    owner: string;
    title: string;
  }>;
  full_name: string;
  is_private: boolean;
  bio_hashtags: string[] | null;
  url: string | null;
  is_joined_recently: boolean | null;
  has_channel: boolean | null;
  partner_id: string | null;
}

export interface IInstagramReels extends IBrightDataWebhookResponse {
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

export interface IInstagramPosts extends IBrightDataWebhookResponse {
  url: string;
  user_posted: string;
  description: string;
  hashtags: string[] | null;
  num_comments: number;
  date_posted: string;
  likes: number;
  photos: string[];
  videos: string[];
  location?: string[];
  latest_comments: Array<{
    comments: string;
    likes: number;
    user_commenting: string;
  }>;
  post_id: string;
  discovery_input: string | null;
  has_handshake: boolean | null;
  display_url: string;
  shortcode: string;
  content_type: PostContentTypeEnum;
  pk: string;
  content_id: string;
  engagement_score_view: number;
  thumbnail: string;
  video_view_count: number;
  product_type: string;
  coauthor_producers: any[];
  tagged_users: any[];
  video_play_count: number;
  followers: number;
  posts_count: number;
  profile_image_link: string;
  is_verified: boolean;
  is_paid_partnership: boolean;
  partnership_details: {
    profile_id: string | null;
    profile_url: string | null;
    username: string | null;
  };
  user_posted_id: string;
  post_content: Array<{
    index: number;
    type: string;
    url: string;
  }>;
  audio: {
    audio_asset_id: string;
    ig_artist_id: string;
    ig_artist_username: string;
    original_audio_title: string;
  };
  profile_url: string;
}
