import apiClient from "../apiClient";

export const getBalance = async (walletAddress: string) => {
    const {data} = await apiClient.get('transactions/balance', {
        params: {address: walletAddress}
    }
    )
    return data;
}

export const sendMoney = async (senderAddress: string, amount: number, walletId: string, receiverAddress: string, description:string, currency:number) => {
    const {data} = await apiClient.post('transactions/send', {
        sender: senderAddress,
        amount,
        walletId,
        receiver: receiverAddress,
        description,
        currency
    })
    return data;
}

export const unlockWallet = async (walletId: string, password: string) => {
    const {data} = await apiClient.post('transactions/unlock', {
        walletId, password
    })
    return data;
}

export const getBalanceWallet = async (userId: string) => {
    const {data} = await apiClient.get('transactions/balance', {
        params: {userId: userId}
    })
    return data;
}

export const getTransactions = async (walletId: string) => {
    const {data} = await apiClient.get('transactions/search', {
        params: {walletId: walletId}
    })
    return data;

}