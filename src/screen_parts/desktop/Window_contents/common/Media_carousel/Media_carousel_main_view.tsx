import { MediaItem } from "../../../../../types";

interface MainViewProps {
  mediaItem: MediaItem
};

export function MediaCarouselMainView({mediaItem}: MainViewProps): JSX.Element | undefined {
  if (!mediaItem.img && !mediaItem.vid) return <div className="w-full h-full"></div>
  if (mediaItem.img) {
    return <img src={mediaItem.img} alt={`Project Photo`} className="w-full h-full object-scale-down" />
  }
  if (mediaItem.vid) {
    return <video src={mediaItem.vid} controls className="w-full h-full"></video>
  }
}