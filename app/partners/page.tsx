"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { BottomNav } from "@/components/bottom-nav"
import { WalletPreview } from "@/components/wallet-preview"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Coins, Sparkles } from "lucide-react"

const REWARDS_DATA = {
  "Para Agora": [
    {
      id: 1,
      name: "Café Energia",
      category: "Restaurante",
      categoryColor: "bg-orange-500",
      item: "Espresso Grátis",
      points: 30,
      badge: "blue",
      subtext: "Válido por 24h após resgate",
      placeholderColor: "8B4513",
    },
    {
      id: 2,
      name: "Sabor & Saúde",
      category: "Restaurante",
      categoryColor: "bg-orange-500",
      item: "10% OFF no Almoço",
      points: 50,
      badge: "blue",
      subtext: "Lim. 1x por dia",
      placeholderColor: "7CB342",
    },
    {
      id: 3,
      name: "SportMax",
      category: "Lojas",
      categoryColor: "bg-blue-600",
      item: "Dose Whey Protein",
      points: 80,
      badge: "blue",
      subtext: "Produto premium",
      placeholderColor: "1976D2",
    },
  ],
  "Benefícios Exclusivos": [
    {
      id: 4,
      name: "Pizzaria Bella Napoli",
      category: "Restaurante",
      categoryColor: "bg-orange-500",
      item: "10% OFF no Rodízio",
      points: 150,
      badge: "purple",
      subtext: "Válido finais de semana",
      placeholderColor: "D32F2F",
    },
    {
      id: 5,
      name: "Zen Yoga",
      category: "Saúde",
      categoryColor: "bg-green-600",
      item: "Aula Experimental",
      points: 150,
      badge: "purple",
      subtext: "Reserve com antecedência",
      placeholderColor: "00897B",
    },
    {
      id: 6,
      name: "Acqua Gym",
      category: "Saúde",
      categoryColor: "bg-green-600",
      item: "Day Pass (Piscina)",
      points: 100,
      badge: "purple",
      subtext: "Válido de Seg-Sex",
      placeholderColor: "0288D1",
    },
    {
      id: 7,
      name: "SportMax",
      category: "Lojas",
      categoryColor: "bg-blue-600",
      item: "20% OFF em Roupas",
      points: 200,
      badge: "purple",
      subtext: "Uso único",
      placeholderColor: "303F9F",
    },
  ],
  "Experiências VIP": [
    {
      id: 8,
      name: "Bike Fix",
      category: "Serviço",
      categoryColor: "bg-purple-600",
      item: "Regulagem de Freio",
      points: 300,
      badge: "gold",
      subtext: "Agende com antecedência",
      placeholderColor: "5E35B1",
    },
    {
      id: 9,
      name: "Spa Relaxamento",
      category: "Saúde",
      categoryColor: "bg-green-600",
      item: "Massagem 50min",
      points: 500,
      badge: "gold",
      subtext: "Agende com antecedência",
      placeholderColor: "C2185B",
    },
    {
      id: 10,
      name: "Green Market",
      category: "Alimentação",
      categoryColor: "bg-emerald-600",
      item: "Cesta Orgânica",
      points: 500,
      badge: "gold",
      subtext: "Frutas e verduras frescas",
      placeholderColor: "388E3C",
    },
    {
      id: 11,
      name: "Nike Store",
      category: "Lojas",
      categoryColor: "bg-blue-600",
      item: "30% OFF em Tênis",
      points: 800,
      badge: "gold",
      subtext: "Produtos selecionados",
      placeholderColor: "212121",
    },
  ],
  Planos: [
    {
      id: 12,
      name: "iRun Club Premium",
      category: "Assinatura",
      categoryColor: "bg-indigo-600",
      item: "1 Mês de Acesso Premium",
      points: 1000,
      badge: "gold",
      subtext: "Benefícios exclusivos + 2x pontos",
      placeholderColor: "FFB300",
    },
  ],
}

const FEATURED_OFFERS = [
  {
    id: 101,
    name: "Café Energia",
    category: "Restaurante",
    categoryColor: "bg-orange-500",
    item: "Espresso Grátis",
    points: 30,
    placeholderColor: "8B4513",
    featured: true,
  },
  {
    id: 102,
    name: "SportMax",
    category: "Lojas",
    categoryColor: "bg-blue-600",
    item: "Dose Whey Protein",
    points: 80,
    placeholderColor: "1976D2",
    featured: true,
  },
  {
    id: 103,
    name: "Green Market",
    category: "Alimentação",
    categoryColor: "bg-emerald-600",
    item: "Cesta Orgânica",
    points: 500,
    placeholderColor: "388E3C",
    featured: true,
  },
]

const USER_POINTS = 450

export default function PartnersPage() {
  const [selectedCollection, setSelectedCollection] = useState<keyof typeof REWARDS_DATA>("Para Agora")

  const collections = Object.keys(REWARDS_DATA) as Array<keyof typeof REWARDS_DATA>
  const currentRewards = REWARDS_DATA[selectedCollection]

  return (
    <div className="min-h-screen pb-20 bg-indigo-50">
      <DashboardHeader user={{ name: "Usuário" }} />
      <main className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl mb-1 font-semibold">Shopping de Trocas</h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Escolha recompensas para sua rotina ou experiências VIP
            </p>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs font-semibold bg-blue-50 text-blue-700 border-blue-300">
                <Coins className="h-3 w-3 mr-1" />
                {USER_POINTS} Pontos Disponíveis
              </Badge>
            </div>
          </div>
          <WalletPreview />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-600" />
            <h2 className="text-sm font-semibold text-gray-900">Em Destaque</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
            {FEATURED_OFFERS.map((offer) => {
              const canAfford = USER_POINTS >= offer.points
              return (
                <Card
                  key={offer.id}
                  className="flex-shrink-0 w-[200px] overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 border-2 border-yellow-200"
                >
                  <div
                    className="relative aspect-[4/3] overflow-hidden"
                    style={{ backgroundColor: `#${offer.placeholderColor}` }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white/20 text-xs font-medium">
                      {offer.item}
                    </div>
                    <Badge className={`absolute top-2 left-2 text-[10px] ${offer.categoryColor} text-white border-0`}>
                      {offer.category}
                    </Badge>
                    <div className="absolute top-2 right-2">
                      <Sparkles className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </div>
                  </div>
                  <CardContent className="p-3 space-y-2">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 leading-tight">{offer.item}</h3>
                      <p className="text-xs text-gray-600 mt-0.5">{offer.name}</p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs font-bold ${
                          canAfford ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {offer.points} Pts
                      </Badge>
                      <Button size="sm" disabled={!canAfford} className="h-7 text-xs px-3">
                        Resgatar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {collections.map((collection) => (
            <Button
              key={collection}
              variant={selectedCollection === collection ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCollection(collection)}
              className="whitespace-nowrap text-xs rounded-full px-4"
            >
              {collection}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {currentRewards.map((reward) => {
            const canAfford = USER_POINTS >= reward.points

            return (
              <Card key={reward.id} className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                <div
                  className="relative aspect-[4/3] overflow-hidden"
                  style={{ backgroundColor: `#${reward.placeholderColor}` }}
                >
                  <div className="w-full h-full flex items-center justify-center text-white/20 text-xs font-medium p-2 text-center">
                    {reward.item}
                  </div>
                  <Badge className={`absolute top-2 left-2 text-[10px] ${reward.categoryColor} text-white border-0`}>
                    {reward.category}
                  </Badge>
                </div>

                <CardContent className="p-3 space-y-2">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-tight">{reward.item}</h3>
                    <p className="text-xs text-gray-600 mt-0.5">{reward.name}</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">{reward.subtext}</p>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <Badge
                      variant="secondary"
                      className={`text-xs font-bold flex-shrink-0 ${
                        reward.badge === "blue"
                          ? "bg-blue-100 text-blue-700"
                          : reward.badge === "purple"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {reward.points} Pts
                    </Badge>
                    <Button
                      size="sm"
                      disabled={!canAfford}
                      className={`h-7 text-xs px-3 flex-1 ${
                        !canAfford ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {!canAfford ? "Insuf." : "Resgatar"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {currentRewards.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-sm text-muted-foreground">Nenhuma recompensa disponível nesta coleção</p>
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
