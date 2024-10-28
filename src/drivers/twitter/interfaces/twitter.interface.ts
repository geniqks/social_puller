import { IBrightDataWebhookResponse } from '@drivers/brightdata/interfaces/brightdata.interface';

export interface ITwitterProfile extends IBrightDataWebhookResponse {
  x_id: string;
  url: string;
  id: string;
  profile_name: string;
  biography: string;
  is_verified: boolean;
  profile_image_link: string;
  external_link: string;
  date_joined: string;
  following: number;
  followers: number;
  subscriptions: number;
  location: string;
  birth_date?: string;
  posts_count: number;
  posts: {
    date_posted: string;
    description: string;
    hashtags: string[];
    likes: number;
    photos: string[];
    post_id: string;
    post_url: string;
    replies: number;
    reposts: number;
    videos?: string[];
    views: number;
  }[];
  suggested_profiles: {
    profile_id: string;
    profile_image: string;
    profile_name: string;
    profile_url: string;
  }[];
  is_business_account: boolean;
  is_government_account: boolean;
  category_name: string;
}

export interface ITwitterPosts extends IBrightDataWebhookResponse {
  id: string;
  user_posted: string;
  name: string;
  description: string;
  date_posted: string;
  photos?: string[];
  url: string;
  tagged_users?: {
    biography?: string;
    followers?: number;
    following?: number;
    is_verified?: boolean;
    profile_id: string;
    profile_name: string;
    url: string;
  }[];
  replies: number;
  reposts: number;
  likes: number;
  views?: number;
  external_url?: string;
  hashtags?: string[];
  followers: number;
  biography: string;
  posts_count: number;
  profile_image_link: string;
  following: number;
  is_verified: boolean;
  quotes: number;
  bookmarks: number;
  parent_post_details: {
    post_id?: string;
    profile_id?: string;
    profile_name?: string;
  };
  external_image_urls?: string[];
  videos?: string[];
  quoted_post?: {
    data_posted?: string;
    description?: string;
    photos?: string[];
    post_id?: string;
    profile_id?: string;
    profile_name?: string;
    url?: string;
    videos?: string[];
  };
}
