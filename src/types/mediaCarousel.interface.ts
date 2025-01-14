export interface MediaItem {
  img?: string;
  vid?: string;
}

export interface MediaCarouselData {
  [groupName: string]: {
    media: MediaItem[];
  };
}