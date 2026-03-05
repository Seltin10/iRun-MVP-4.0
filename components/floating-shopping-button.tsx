import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FloatingShoppingButton() {
  return (
    <div className="fixed bottom-24 left-0 right-0 px-4 sm:px-6 z-10">
      <Link href="/rewards" className="block">
        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg py-6 text-base font-semibold">
          Ir para Shopping de Trocas
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  )
}
