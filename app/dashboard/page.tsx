"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import Link from "next/link"

// Sample data for the chart
const balanceData = [
  { name: "Jan", balance: 400000 },
  { name: "Feb", balance: 500000 },
  { name: "Mar", balance: 450000 },
  { name: "Apr", balance: 700000 },
  { name: "May", balance: 650000 },
  { name: "Jun", balance: 800000 },
  { name: "Jul", balance: 900000 },
]

// Sample data for recent transactions
const recentTransactions = [
  { id: 1, type: "received", amount: "₦ 50,000", from: "Alex Johnson", date: "Today, 10:24 AM", asset: "BTC" },
  { id: 2, type: "sent", amount: "₦ 25,000", to: "Sarah Williams", date: "Yesterday, 3:15 PM", asset: "ETH" },
  { id: 3, type: "received", amount: "₦ 100,000", from: "Michael Brown", date: "May 2, 2:45 PM", asset: "USDT" },
]

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
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
                <span className="text-3xl font-bold">₦ 900,000</span>
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
                      <span className="text-orange-500 text-xs font-bold">BTC</span>
                    </div>
                    <div>
                      <div className="font-medium">Bitcoin</div>
                      <div className="text-xs text-gray-500">0.0045 BTC</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₦ 450,000</div>
                    <div className="text-xs text-green-500">+2.4%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-500 text-xs font-bold">ETH</span>
                    </div>
                    <div>
                      <div className="font-medium">Ethereum</div>
                      <div className="text-xs text-gray-500">0.25 ETH</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₦ 300,000</div>
                    <div className="text-xs text-green-500">+1.8%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-500 text-xs font-bold">USDT</span>
                    </div>
                    <div>
                      <div className="font-medium">Tether</div>
                      <div className="text-xs text-gray-500">150 USDT</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₦ 150,000</div>
                    <div className="text-xs text-gray-500">0.0%</div>
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
                  data={balanceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888888" />
                  <YAxis stroke="#888888" tickFormatter={(value) => `₦${value / 1000}k`} />
                  <Tooltip
                    formatter={(value) => [`₦ ${value}`, "Balance"]}
                    labelFormatter={(label) => `${label} 2023`}
                  />
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
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        transaction.type === "received" ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "received" ? (
                        <ArrowDownLeft className={`h-5 w-5 text-green-500`} />
                      ) : (
                        <ArrowUpRight className={`h-5 w-5 text-red-500`} />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">
                        {transaction.type === "received" ? "Received from" : "Sent to"}{" "}
                        {transaction.type === "received" ? transaction.from : transaction.to}
                      </div>
                      <div className="text-xs text-gray-500">{transaction.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-medium ${transaction.type === "received" ? "text-green-500" : "text-red-500"}`}
                    >
                      {transaction.type === "received" ? "+" : "-"}
                      {transaction.amount}
                    </div>
                    <div className="text-xs text-gray-500">{transaction.asset}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
