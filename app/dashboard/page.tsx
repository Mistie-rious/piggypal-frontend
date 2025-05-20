"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, TrendingUp } from "lucide-react"
import { ProtectedRoute } from "@/components/protectedRoute"
import { useAuth } from "@/components/providers/auth-provider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import Link from "next/link"
import { useBalanceWallet, useTransactions } from "@/hooks/useTransactions"
import { useMe } from "@/hooks/useMe"
import { format, parseISO } from "date-fns";
import LoadingSpinner from "@/components/loadingSpinner"

// Sample data for the chart
const chartData = [
  { name: "Jan", balance: 400000 },
  { name: "Feb", balance: 500000 },
  { name: "Mar", balance: 450000 },
  { name: "Apr", balance: 700000 },
  { name: "May", balance: 650000 },
  { name: "Jun", balance: 800000 },
  { name: "Jul", balance: 900000 },
]

export default function Dashboard() {
  // Call all hooks at the top, unconditionally
  const { user, logout } = useAuth();
  const { data: me, isLoading: meLoading, error: meError } = useMe();
  
  // Safe access to me.data with fallbacks
  const walletAddress = me?.data.walletAddress ?? "";
  const userId = me?.data.id ?? "";
  const walletId = me?.data.walletId ?? "";
  
  const { data: walletData, isLoading: walletLoading } = useBalanceWallet(userId);
  const { data: transactionsData, isLoading: transLoading } = useTransactions(walletId);


  const chartDataFromTransactions = (() => {
    if (!transactionsData || transactionsData.length === 0) return [];
  
    const ethToNaira = 4500000;
    const cumulativeData: { name: string; balance: number }[] = [];
  
    let cumulativeBalance = 0;
  
    // Sort by timestamp (oldest first)
    const sortedTx = [...transactionsData].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  
    for (const tx of sortedTx) {
      const timeLabel = format(parseISO(tx.createdAt), "HH:mm:ss");
      const amountInNaira = tx.amount * ethToNaira;
  
      if (tx.TransactionType === 1) {
        cumulativeBalance += amountInNaira;
      } else {
        cumulativeBalance -= amountInNaira;
      }
  
      cumulativeData.push({
        name: timeLabel,  // use HH:mm:ss as X axis
        balance: cumulativeBalance,
      });
    }
  
    return cumulativeData;
  })();


const ethToNairaRate = 4500000; 
const nairaBalanceRaw = walletData?.balance * ethToNairaRate; 

const nairaBalance = `₦${nairaBalanceRaw.toLocaleString("en-NG", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}`;
  // Handle loading and error states after all hooks
  if (meLoading || walletLoading || transLoading) {
    return <div> <LoadingSpinner/></div>;
  }

  if (meError) {
    return <div>Error loading user data: {meError.message}</div>;
  }

  // Debugging logs (optional, remove in production)
  console.log("Transactions Data:", transactionsData);
  console.log("Balance Data:", walletData);
  console.log("Me Data:", me);

  // Render the dashboard
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-3">
             
              <h2 className="text-2xl font-bold">Dashboard</h2>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/transactions/send">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Send
                </Link>
              </Button>
              <Button asChild className="bg-pink-500 hover:bg-pink-600" size="sm">
                <Link href="/transactions/receive">
                  <ArrowDownLeft className="mr-2 h-4 w-4" />
                  Receive
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Balance Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">TOTAL BALANCE</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">
                  {nairaBalance}
                  </span>
                  <span className="ml-2 text-sm text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.5%
                  </span>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <Link href="/transactions/send">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Send
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="rounded-full bg-pink-500 hover:bg-pink-600">
                    <Link href="/transactions/receive">
                      <ArrowDownLeft className="mr-2 h-4 w-4" />
                      Receive
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Assets Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">YOUR ASSETS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                        <span className="text-orange-500 text-xs font-bold">ETH</span>
                      </div>
                      <div>
                        <div className="font-medium">ETH</div>
                        <div className="text-xs text-gray-500">{walletData.balance}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{nairaBalance}</div>
                      <div className="text-xs text-green-500">+2.4%</div>
                    </div>
                  </div>
              
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Balance History Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Balance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                <LineChart
  data={chartDataFromTransactions}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
>
  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
  <XAxis dataKey="name" stroke="#888888" />
  <YAxis stroke="#888888" tickFormatter={(value) => `₦${value / 1000}k`} />
  <Tooltip formatter={(value) => [`₦ ${value}`, "Balance"]} />
  <Line
    type="monotone"
    dataKey="balance"
    stroke="#ec4899"
    strokeWidth={2}
    dot={{ r: 4, strokeWidth: 2 }}
    activeDot={{ r: 6, strokeWidth: 2 }}
  />
</LineChart>

                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/transactions">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactionsData.map((transaction: any) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center">
                    <div
          className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
            transaction.type === 0
              ? "bg-green-100"
              : transaction.type === 1
              ? "bg-red-100"
              : "bg-blue-100"
          }`}
        >
          {transaction.type === 0 ? (
            <ArrowDownLeft className="h-5 w-5 text-green-500" />
          ) : (
            <ArrowUpRight className="h-5 w-5 text-red-500" />
          ) }
        </div>
                      <div>
                      <div className="font-medium">
          {transaction.type === 0
            ? `Credited to ${transaction.receiverAddress}`
            : transaction.type === 1
            ? `Debited from ${transaction.senderAddress}`
            : `${transaction.senderAddress} → ${transaction.receiverAddress}`}
        </div>
                        <div className="text-xs text-gray-500"> {transaction.createdAt?.substring(0, 10)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-medium ${transaction.TransactionType === "received" ? "text-green-500" : "text-red-500"}`}
                      >
                        
                         {transaction.TransactionType === "received" ? "+" : "-"} <span> ETH </span>
                         {transaction.amount}
                      </div>
                      <div
        className={`text-xs font-medium px-2 py-1 rounded ${
          transaction.status === 0
            ? "text-yellow-800 bg-yellow-100"
            : transaction.status === 1
            ? "text-green-800 bg-green-100"
            : "text-red-800 bg-red-100"
        }`}
      >
        {transaction.status === 0
          ? "Pending"
          : transaction.status === 1
          ? "Successful"
          : "Failed"}
      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}