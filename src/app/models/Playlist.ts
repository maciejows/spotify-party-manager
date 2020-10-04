import { Track } from './Track';
export class Playlist {
  id: string;
  name: string;
  description: string;
  uri: string;
  collaborative: boolean;
  image: string;
  ownerId: string;
  tracksTotal: number;
  tracksHref: string;
  items: Track[];

  constructor(object: any) {
    this.name = object.name;
    this.id = object.id;
    this.description = object.description;
    this.uri = object.uri;
    this.collaborative = object.collaborative;
    this.image = object.images[0].url;
    this.ownerId = object.owner.id;
    this.tracksTotal = object.tracks.total;
    this.tracksHref = object.tracks.href;
    this.items = [];
  }
}
