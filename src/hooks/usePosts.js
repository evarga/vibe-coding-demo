import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/client';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await api.get('/posts?_expand=user&_sort=id&_order=desc');
      return data;
    },
  });
}

export function useUserPosts(userId) {
  return useQuery({
    queryKey: ['posts', { userId }],
    queryFn: async () => {
      const { data } = await api.get(`/users/${userId}/posts?_expand=user&_sort=id&_order=desc`);
      return data;
    },
    enabled: !!userId,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPost) => {
      const { data } = await api.post('/posts', newPost);
      return data;
    },
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      const globalKey = ['posts'];
      const userKeyStr = ['posts', { userId: String(newPost.userId) }];
      const userKeyNum = ['posts', { userId: Number(newPost.userId) }];

      const prevGlobal = queryClient.getQueryData(globalKey);
      const prevUserStr = queryClient.getQueryData(userKeyStr);
      const prevUserNum = queryClient.getQueryData(userKeyNum);

      const currentUser = queryClient.getQueryData(['users', String(newPost.userId)]) 
                       || queryClient.getQueryData(['users', Number(newPost.userId)]);

      const optimisticPost = {
        ...newPost,
        id: Math.random().toString(36),
        user: currentUser || { id: newPost.userId, name: 'You (Optimistic)', username: 'you' },
      };

      if (prevGlobal) queryClient.setQueryData(globalKey, [optimisticPost, ...prevGlobal]);
      if (prevUserStr) queryClient.setQueryData(userKeyStr, [optimisticPost, ...prevUserStr]);
      if (prevUserNum) queryClient.setQueryData(userKeyNum, [optimisticPost, ...prevUserNum]);

      return { prevGlobal, prevUserStr, prevUserNum, globalKey, userKeyStr, userKeyNum };
    },
    onError: (err, newPost, context) => {
      if (context?.prevGlobal !== undefined) queryClient.setQueryData(context.globalKey, context.prevGlobal);
      if (context?.prevUserStr !== undefined) queryClient.setQueryData(context.userKeyStr, context.prevUserStr);
      if (context?.prevUserNum !== undefined) queryClient.setQueryData(context.userKeyNum, context.prevUserNum);
      console.error("Failed to create post, rolled back.", err);
      alert("Failed to create post. Please try again.");
    },
    // On success, we usually invalidate the query. 
    // BUT since JSONPlaceholder doesn't persist, invalidating will wipe our new post.
    // So we just leave the optimistic update in the cache for the demo!
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId) => {
      await api.delete(`/posts/${postId}`);
      return postId;
    },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      
      const queryStates = queryClient.getQueriesData({ queryKey: ['posts'] });
      
      queryClient.setQueriesData({ queryKey: ['posts'] }, (old) => {
        if (!Array.isArray(old)) return old;
        return old.filter(post => post.id !== postId);
      });

      return { queryStates };
    },
    onError: (err, postId, context) => {
      context?.queryStates?.forEach(([queryKey, oldData]) => {
        queryClient.setQueryData(queryKey, oldData);
      });
      console.error("Failed to delete post, rolled back.", err);
      alert("Failed to delete post. Please try again.");
    },
    // Skipping invalidate for the same reason as create
  });
}

export function useComments(postId) {
  return useQuery({
    queryKey: ['comments', { postId }],
    queryFn: async () => {
      const { data } = await api.get(`/posts/${postId}/comments`);
      return data;
    },
    enabled: !!postId,
  });
}
