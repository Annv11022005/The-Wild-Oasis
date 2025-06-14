import { useMutation } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUserUpdate() {
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success('Xong!!');
    },
  });

  return { updateUser, isUpdating };
}
