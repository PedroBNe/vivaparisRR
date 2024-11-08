'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, Clock } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ComingSoonPage() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set the launch date to 30 days from now
    const launchDate = new Date('2024-12-08T12:18:06');
    // const launchDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

    const timer = setInterval(() => {
      const now = new Date()
      const difference = launchDate.getTime() - now.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })

      if (difference < 0) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Subscribed with email:', email)
    setIsSubscribed(true)
    setEmail('')
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold mb-2">Em Breve</CardTitle>
          <CardDescription className="text-xl">
            Estamos trabalhando duro para trazer esta funcionalidade para você!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center space-x-4 mb-8">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="text-4xl font-bold">{value}</div>
                <div className="text-sm uppercase">{unit}</div>
              </div>
            ))}
          </div>
          <div className="text-center mb-8">
            <p className="text-lg">
              Estamos animados para lançar esta nova funcionalidade. Fique ligado para mais atualizações!
            </p>
          </div>
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Receba notificações sobre o lançamento</Label>
                <div className="flex space-x-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Seu endereço de e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit">Inscrever-se</Button>
                </div>
              </div>
            </form>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Sucesso!</AlertTitle>
              <AlertDescription>
                Você foi inscrito para receber atualizações. Obrigado pelo seu interesse!
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="outline" onClick={() => window.history.back()}>
            Voltar ao Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}