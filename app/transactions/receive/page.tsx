"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function Receive() {
  return (
    <DashboardLayout>
      <div className="p-6 flex justify-center">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Transfer Funds</h1>
            <p className="text-gray-500">Send, transfer, or receive crypto</p>
          </div>

          <Tabs defaultValue="receive" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="send" asChild>
                <Link href="/transactions/send">Send</Link>
              </TabsTrigger>
              <TabsTrigger value="transfer" asChild>
                <Link href="/transactions/transfer">Transfer</Link>
              </TabsTrigger>
              <TabsTrigger value="receive">Receive</TabsTrigger>
            </TabsList>

            <TabsContent value="receive">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="receive-to">Receive to</Label>
                    <Select defaultValue="main">
                      <SelectTrigger>
                        <SelectValue placeholder="Select wallet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Wallet</SelectItem>
                        <SelectItem value="savings">Savings Wallet</SelectItem>
                        <SelectItem value="business">Business Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-center py-6">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="w-48 h-48 bg-white flex items-center justify-center border">
                        <div className="text-center">
                          <div className="text-sm text-gray-500 mb-2">QR Code</div>
                          <div className="text-xs">Scan to receive payment</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wallet-address">Wallet Address</Label>
                    <div className="relative">
                      <input
                        id="wallet-address"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                        readOnly
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-7"
                        onClick={() => {
                          navigator.clipboard.writeText("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh")
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full bg-pink-500 hover:bg-pink-600">
                      <ArrowDownLeft className="mr-2 h-4 w-4" />
                      Generate New Address
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
