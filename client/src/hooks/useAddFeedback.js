import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance } from '../axiosInstance';

const addFeedback = async ({ user_id, value }) => {
  console.log({ user_id, value });
  return axiosInstance.post(`/api/postFeedback`, {
    user_id,
    value,
  });
};

export const useAddFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation(addFeedback, {
    onSuccess: () => {
      queryClient.invalidateQueries(['feedback']);
    },
  });
};
