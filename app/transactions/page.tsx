"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpRight, ArrowDownLeft, Download, Search, Filter, ChevronDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for transactions
const transactions = [
  {
    id: 1,
    type: "received",
    amount: "₦ 50,000",
    from: "Alex Johnson",
    date: "May 3, 2023",
    time: "10:24 AM",
    asset: "BTC",
    status: "completed",
  },
  {
    id: 2,
    type: "sent",
    amount: "₦ 25,000",
    to: "Sarah Williams",
    date: "May 2, 2023",
    time: "3:15 PM",
    asset: "ETH",
    status: "completed",
  },
  {
    id: 3,
    type: "received",
    amount: "₦ 100,000",
    from: "Michael Brown",
    date: "May 2, 2023",
    time: "2:45 PM",
    asset: "USDT",
    status: "completed",
  },
  {
    id: 4,
    type: "sent",
    amount: "₦ 75,000",
    to: "Emma Wilson",
    date: "May 1, 2023",
    time: "11:30 AM",
    asset: "BTC",
    status: "completed",
  },
  {
    id: 5,
    type: "received",
    amount: "₦ 200,000",
    from: "James Taylor",
    date: "Apr 30, 2023",
    time: "9:15 AM",
    asset: "ETH",
    status: "completed",
  },
  {
    id: 6,
    type: "sent",
    amount: "₦ 150,000",
    to: "Olivia Martinez",
    date: "Apr 29, 2023",
    time: "4:45 PM",
    asset: "USDT",
    status: "completed",
  },
  {
    id: 7,
    type: "received",
    amount: "₦ 80,000",
    from: "William Johnson",
    date: "Apr 28, 2023",
    time: "2:30 PM",
    asset: "BTC",
    status: "completed",
  },
]

export default function Transactions() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Transaction History</h1>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle>All Transactions</CardTitle>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="search" placeholder="Search transactions..." className="pl-8 w-full" />
                </div>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Filter className="h-4 w-4" />
                        Filter
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>All Transactions</DropdownMenuItem>
                      <DropdownMenuItem>Received Only</DropdownMenuItem>
                      <DropdownMenuItem>Sent Only</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Date Range</DropdownMenuLabel>
                      <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                      <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                      <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                      <DropdownMenuItem>Custom Range</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Export
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem onClick={() => alert("Exporting as CSV...")}>Export as CSV</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => alert("Exporting as PDF...")}>Export as PDF</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                              transaction.type === "received" ? "bg-green-100" : "bg-red-100"
                            }`}
                          >
                            {transaction.type === "received" ? (
                              <ArrowDownLeft className={`h-4 w-4 text-green-500`} />
                            ) : (
                              <ArrowUpRight className={`h-4 w-4 text-red-500`} />
                            )}
                          </div>
                          <span className="capitalize">
                            {transaction.type === "received" ? `From ${transaction.from}` : `To ${transaction.to}`}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell
                        className={`font-medium ${transaction.type === "received" ? "text-green-500" : "text-red-500"}`}
                      >
                        {transaction.type === "received" ? "+" : "-"}
                        {transaction.amount}
                      </TableCell>
                      <TableCell>{transaction.asset}</TableCell>
                      <TableCell>
                        <div>{transaction.date}</div>
                        <div className="text-xs text-gray-500">{transaction.time}</div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                          {transaction.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
