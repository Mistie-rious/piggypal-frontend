"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowRight, Repeat } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Send() {
  const [amount, setAmount] = useState("")
  const [convertedAmount, setConvertedAmount] = useState("")

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value)

    // Simple conversion simulation
    if (value) {
      const numValue = Number.parseFloat(value.replace(/,/g, ""))
      if (!isNaN(numValue)) {
        setConvertedAmount((numValue * 0.000021).toFixed(8))
      } else {
        setConvertedAmount("")
      }
    } else {
      setConvertedAmount("")
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 flex justify-center">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Transfer Funds</h1>
            <p className="text-gray-500">Send, transfer, or receive crypto</p>
          </div>

          <Tabs defaultValue="send" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="send">Send</TabsTrigger>
              <TabsTrigger value="transfer">Transfer</TabsTrigger>
              <TabsTrigger value="receive">Receive</TabsTrigger>
            </TabsList>

            <TabsContent value="send">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="from-wallet">Send from</Label>
                    <Select defaultValue="main">
                      <SelectTrigger>
                        <SelectValue placeholder="Select wallet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Wallet (₦ 900,000)</SelectItem>
                        <SelectItem value="savings">Savings Wallet (₦ 250,000)</SelectItem>
                        <SelectItem value="business">Business Wallet (₦ 450,000)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient">Send to</Label>
                    <Input id="recipient" placeholder="Enter wallet address or username" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asset">Asset</Label>
                    <Select defaultValue="btc">
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                        <SelectItem value="usdt">Tether (USDT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                      <Input id="amount" placeholder="0.00" value={amount} onChange={handleAmountChange} />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                        NGN
                      </div>
                    </div>

                    {convertedAmount && (
                      <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
                        <span>Conversion</span>
                        <div className="flex items-center">
                          <span>{convertedAmount} BTC</span>
                          <Repeat className="h-3 w-3 ml-1" />
                        </div>
                      </div>
                    )}
                  </div>

                  <Button className="w-full mt-6 bg-pink-500 hover:bg-pink-600">
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Send Funds
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transfer">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="transfer-from">Transfer from</Label>
                    <Select defaultValue="main">
                      <SelectTrigger>
                        <SelectValue placeholder="Select wallet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Wallet (₦ 900,000)</SelectItem>
                        <SelectItem value="savings">Savings Wallet (₦ 250,000)</SelectItem>
                        <SelectItem value="business">Business Wallet (₦ 450,000)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transfer-to">Transfer to</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="savings">Savings Wallet</SelectItem>
                        <SelectItem value="business">Business Wallet</SelectItem>
                        <SelectItem value="investment">Investment Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full mt-6 bg-pink-500 hover:bg-pink-600">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

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
                      <Input id="wallet-address" value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" readOnly />
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
