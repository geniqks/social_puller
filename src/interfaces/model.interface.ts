// #region Post
export enum PostOriginEnum {
  TWITTER = "twitter",
  INSTAGRAM = "instagram",
  REDDIT = "reddit",
}

// ! Don't update the value they are the same as the one returned by BrightData
export enum PostContentTypeEnum {
  PHOTO = "photo",
  VIDEO = "video",
  REEL = "reel",
  CAROUSEL = "Carousel",
}
// #endregion

// #region BrightDataMonitor
export enum BrightDataStatusEnum {
  COLLECTING = "collecting",
  DIGESTING = "digesting",
  RUNNING = "running",
  READY = "ready",
  FAILED = "failed",
}
// #endregion
