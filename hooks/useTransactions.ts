import { getBalance, sendMoney , getBalanceWallet, getTransactions} from "@/api/routes/transactions"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"

  
interface SendMoneyParams {
  senderAddress: string;
  amount: number;
  walletId: string;
  receiverAddress: string;
  description: string;
}

export const useBalance = (walletAddress: string) => {
  return useQuery({
    queryKey: ['transactions', walletAddress],
    queryFn: () => getBalance(walletAddress),
    enabled: !!walletAddress,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};

export const useTransactions = (walletId: string) => {
  return useQuery({
    queryKey: ['balance', walletId],
    queryFn: () => getTransactions(walletId),
    enabled: !!walletId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
}
export const useBalanceWallet = (userId: string) => {
  return useQuery({
    queryKey: ['balanceWallet', userId],
    queryFn: () => getBalanceWallet(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  })

}




  export const useSendMoney = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ senderAddress, amount, walletId, receiverAddress, description }: SendMoneyParams) =>
        sendMoney(senderAddress, amount, walletId, receiverAddress, description),
      onSuccess: (data, variables) => {
        // Invalidate and refetch relevant queries
        queryClient.invalidateQueries({ queryKey: ['balance', variables.senderAddress] });
        queryClient.invalidateQueries({ queryKey: ['balance', variables.receiverAddress] });
        queryClient.invalidateQueries({ queryKey: ['transactions', variables.walletId] });
        queryClient.invalidateQueries({ queryKey: ['balanceWallet'] });
      },
    });
  }

