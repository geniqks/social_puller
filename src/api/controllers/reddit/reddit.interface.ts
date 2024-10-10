export interface SubredditListing {
  kind: string;
  data: SubredditListingData;
}

export interface SubredditListingData {
  children: SubredditListingDataChild[];
  after: string | null;
  before: string | null;
  dist: number | null;
  geo_filter: string | null;
  modhash: string | null;
}

export interface SubredditListingDataChild {
  kind: string;
  data: SubredditListingDataChildData;
}

export interface SubredditListingDataChildData {
  // Date of approval in UTC, null if not approved
  approved_at_utc: number | null;
  // Name of the subreddit
  subreddit: string;
  // Text of the post
  selftext: string;
  // Full name of the author
  author_fullname: string;
  // Indicates if the post is saved
  saved: boolean;
  // Moderator reason title, null if not applicable
  mod_reason_title: string | null;
  // Number of times the post has been "gilded"
  gilded: number;
  // Indicates if the post has been clicked
  clicked: boolean;
  // Title of the post
  title: string;
  // Flair of the link in rich text
  link_flair_richtext: Array<{ e: string; t: string }>;
  // Name of the subreddit with prefix "r/"
  subreddit_name_prefixed: string;
  // Indicates if the post is hidden
  hidden: boolean;
  // Whitelist level
  pwls: number;
  // CSS class of the link flair
  link_flair_css_class: string;
  // Number of downvotes
  downs: number;
  // Height of the thumbnail, null if not applicable
  thumbnail_height: number | null;
  // Type of the top award, null if not applicable
  top_awarded_type: string | null;
  // Indicates if the score is hidden
  hide_score: boolean;
  // Unique name of the post
  name: string;
  // Indicates if the post is quarantined
  quarantine: boolean;
  // Text color of the link flair
  link_flair_text_color: string;
  // Upvote ratio
  upvote_ratio: number;
  // Background color of the author flair, null if not applicable
  author_flair_background_color: string | null;
  // Type of subreddit (public, private, etc.)
  subreddit_type: string;
  // Number of upvotes
  ups: number;
  // Total number of awards received
  total_awards_received: number;
  // Media embed information
  media_embed: Record<string, unknown>;
  // Width of the thumbnail, null if not applicable
  thumbnail_width: number | null;
  // ID of the author flair template, null if not applicable
  author_flair_template_id: string | null;
  // Indicates if the content is original
  is_original_content: boolean;
  // User reports
  user_reports: Array<unknown>;
  // Secure media, null if not applicable
  secure_media: unknown | null;
  // Indicates if the domain is Reddit's
  is_reddit_media_domain: boolean;
  // Indicates if the post is meta
  is_meta: boolean;
  // Category of the post, null if not applicable
  category: string | null;
  // Secure media embed information
  secure_media_embed: Record<string, unknown>;
  // Text of the link flair
  link_flair_text: string;
  // Indicates if the post can be moderated
  can_mod_post: boolean;
  // Score of the post
  score: number;
  // Approved by, null if not applicable
  approved_by: string | null;
  // Indicates if the post was created from the ads UI
  is_created_from_ads_ui: boolean;
  // Indicates if the author is premium
  author_premium: boolean;
  // URL of the thumbnail
  thumbnail: string;
  // Indicates if the post has been edited
  edited: boolean;
  // CSS class of the author flair, null if not applicable
  author_flair_css_class: string | null;
  // Rich text of the author flair
  author_flair_richtext: Array<unknown>;
  // Gildings information
  gildings: Record<string, unknown>;
  // Content categories, null if not applicable
  content_categories: string | null;
  // Indicates if the post is a self-post
  is_self: boolean;
  // Moderator note, null if not applicable
  mod_note: string | null;
  // Creation date in timestamp
  created: number;
  // Type of the link flair
  link_flair_type: string;
  // Whitelist level
  wls: number;
  // Removal category, null if not applicable
  removed_by_category: string | null;
  // Banned by, null if not applicable
  banned_by: string | null;
  // Type of the author flair
  author_flair_type: string;
  // Domain of the post
  domain: string;
  // Indicates if live comments are allowed
  allow_live_comments: boolean;
  // HTML of the post text, null if not applicable
  selftext_html: string | null;
  // Indicates if the post is liked, null if not applicable
  likes: boolean | null;
  // Suggested sort order
  suggested_sort: string;
  // Banned date in UTC, null if not applicable
  banned_at_utc: number | null;
  // View count, null if not applicable
  view_count: number | null;
  // Indicates if the post is archived
  archived: boolean;
  // Indicates if the post should not be followed
  no_follow: boolean;
  // Indicates if the post can be crossposted
  is_crosspostable: boolean;
  // Indicates if the post is pinned
  pinned: boolean;
  // Indicates if the post is for over 18
  over_18: boolean;
  // All awards received
  all_awardings: Array<unknown>;
  // Awarders
  awarders: Array<unknown>;
  // Indicates if the post is media only
  media_only: boolean;
  // ID of the link flair template
  link_flair_template_id: string;
  // Indicates if the post can be "gilded"
  can_gild: boolean;
  // Indicates if the post contains spoilers
  spoiler: boolean;
  // Indicates if the post is locked
  locked: boolean;
  // Text of the author flair, null if not applicable
  author_flair_text: string | null;
  // Treatment tags
  treatment_tags: Array<unknown>;
  // Indicates if the post has been visited
  visited: boolean;
  // Removed by, null if not applicable
  removed_by: string | null;
  // Number of reports, null if not applicable
  num_reports: number | null;
  // Distinguished, null if not applicable
  distinguished: string | null;
  // ID of the subreddit
  subreddit_id: string;
  // Indicates if the author is blocked
  author_is_blocked: boolean;
  // Moderator reason by, null if not applicable
  mod_reason_by: string | null;
  // Removal reason, null if not applicable
  removal_reason: string | null;
  // Background color of the link flair
  link_flair_background_color: string;
  // ID of the post
  id: string;
  // Indicates if the post is indexable by robots
  is_robot_indexable: boolean;
  // Report reasons, null if not applicable
  report_reasons: Array<unknown> | null;
  // Author of the post
  author: string;
  // Type of discussion, null if not applicable
  discussion_type: string | null;
  // Number of comments
  num_comments: number;
  // Indicates if replies are sent
  send_replies: boolean;
  // Whitelist status
  whitelist_status: string;
  // Indicates if contest mode is enabled
  contest_mode: boolean;
  // Moderator reports
  mod_reports: Array<unknown>;
  // Indicates if the author has a Patreon flair
  author_patreon_flair: boolean;
  // Text color of the author flair, null if not applicable
  author_flair_text_color: string | null;
  // Permalink of the post
  permalink: string;
  // Parent whitelist status
  parent_whitelist_status: string;
  // Indicates if the post is stickied
  stickied: boolean;
  // URL of the post
  url: string;
  // Number of subscribers to the subreddit
  subreddit_subscribers: number;
  // Creation date in UTC
  created_utc: number;
  // Number of crossposts
  num_crossposts: number;
  // Media, null if not applicable
  media: unknown | null;
  // Indicates if the post is a video
  is_video: boolean;
}