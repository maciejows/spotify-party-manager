export class PlaylistTracksMetadata {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;

  constructor(data: any = {}) {
    this.href = data.href || '';
    this.limit = data.limit || 0;
    this.next = data.next || '';
    this.offset = data.offset || 0;
    this.previous = data.previous || '';
    this.total = data.total || 0;
  }
}
