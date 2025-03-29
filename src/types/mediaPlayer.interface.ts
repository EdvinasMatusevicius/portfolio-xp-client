export interface Station {
    changeId: string;
    id: string;
    name: string;
    url: string;
    urlResolved: string;
    homepage: string;
    favicon: string;
    country: string;
    countryCode: string;
    state: string;
    votes: number;
    codec: string;
    bitrate: number;
    clickCount: number;
    clickTrend: number;
    hls: boolean;
    lastCheckOk: boolean;
    lastChangeTime: string;
    lastCheckOkTime: string;
    clickTimestamp: string;
    lastLocalCheckTime: string;
    language: string[];
    lastCheckTime: string;
    geoLat: number | null;
    geoLong: number | null;
    tags: string[];
};
export interface MediaPlayerState {
    radioStationsArr: Station[]
}