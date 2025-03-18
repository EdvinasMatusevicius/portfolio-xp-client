export interface MediaItem {
  img?: string;
  vid?: () => Promise<{ default: string }>;
}
export interface LoadedMediaItem extends Omit<MediaItem, 'vid'> {
  vid?: string;
}
export interface MediaCarouselData {
  [groupName: string]: {
    media: MediaItem[];
  };
}