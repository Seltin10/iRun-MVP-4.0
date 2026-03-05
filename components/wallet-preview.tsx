"use client"

import { useState } from "react"
import { Ticket } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"

export function WalletPreview() {
  const [timeRemaining, setTimeRemaining] = useState("01:59h")

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
          <Ticket className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-medium">Carteira</span>
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-[10px] rounded-full">
            1
          </Badge>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Minha Carteira</SheetTitle>
          <SheetDescription>Cupons ativos prontos para usar</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <Card className="border-2 border-red-200 bg-red-50">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm">Café Energia</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Espresso Grátis</p>
                </div>
                <Badge variant="destructive" className="text-xs font-bold">
                  Expira em {timeRemaining}
                </Badge>
              </div>

              <div className="bg-white rounded-lg p-3 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gray-100 rounded">
                    <div className="space-y-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-1">
                          {[...Array(8)].map((_, j) => (
                            <div
                              key={j}
                              className="w-2 h-6 bg-gray-800 rounded-sm"
                              style={{
                                height: Math.random() > 0.5 ? "24px" : "16px",
                              }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">IRUN-CF-2024-XY89</p>
                </div>
              </div>

              <p className="text-xs text-center text-muted-foreground">Apresente este código no estabelecimento</p>

              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Compartilhar Cupom
              </Button>
            </CardContent>
          </Card>

          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">Nenhum outro cupom ativo</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
