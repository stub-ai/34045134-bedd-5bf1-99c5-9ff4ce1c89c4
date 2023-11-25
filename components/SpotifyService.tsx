import axios from 'axios';

class SpotifyService {
  constructor(private accessToken: string) {}

  async getLikedSongs() {
    const response = await axios.get('https://api.spotify.com/v1/me/tracks', {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    return response.data.items;
  }

  async createPlaylist(userId: string, name: string) {
    const response = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      name: name,
      public: false
    }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    return response.data;
  }

  async addTracksToPlaylist(playlistId: string, trackUris: string[]) {
    await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      uris: trackUris
    }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });
  }
}

export default SpotifyService;