import { useQuery } from '@tanstack/react-query';
import api from '../api/client';

export function useUserAlbums(userId) {
  return useQuery({
    queryKey: ['albums', { userId }],
    queryFn: async () => {
      const { data } = await api.get(`/users/${userId}/albums`);
      return data;
    },
    enabled: !!userId,
  });
}

export function useAlbumPhotos(albumId) {
  return useQuery({
    queryKey: ['photos', { albumId }],
    queryFn: async () => {
      const { data } = await api.get(`/albums/${albumId}/photos`);
      return data;
    },
    enabled: !!albumId,
  });
}
