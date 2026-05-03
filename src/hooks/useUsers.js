import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/client';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await api.get('/users');
      return data;
    },
  });
}

export function useUser(userId) {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: async () => {
      const { data } = await api.get(`/users/${userId}`);
      return data;
    },
    enabled: !!userId,
  });
}

export function useUserTodos(userId) {
  return useQuery({
    queryKey: ['todos', { userId }],
    queryFn: async () => {
      const { data } = await api.get(`/users/${userId}/todos`);
      return data;
    },
    enabled: !!userId,
  });
}

export function useToggleTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todo) => {
      const { data } = await api.put(`/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      });
      return data;
    },
    onMutate: async (todo) => {
      const stringId = String(todo.userId);
      const numId = Number(todo.userId);
      
      await queryClient.cancelQueries({ queryKey: ['todos', { userId: stringId }] });
      await queryClient.cancelQueries({ queryKey: ['todos', { userId: numId }] });

      const previousTodosStr = queryClient.getQueryData(['todos', { userId: stringId }]);
      const previousTodosNum = queryClient.getQueryData(['todos', { userId: numId }]);
      const previousTodos = previousTodosStr || previousTodosNum;

      const updateTodos = (old) => 
        old?.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t);

      queryClient.setQueryData(['todos', { userId: stringId }], updateTodos);
      queryClient.setQueryData(['todos', { userId: numId }], updateTodos);

      return { previousTodos, stringId, numId };
    },
    onError: (err, todo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos', { userId: context.stringId }], context.previousTodos);
        queryClient.setQueryData(['todos', { userId: context.numId }], context.previousTodos);
      }
      console.error("Failed to toggle todo, rolled back.", err);
      alert("Failed to update task. Please try again.");
    },
  });
}
