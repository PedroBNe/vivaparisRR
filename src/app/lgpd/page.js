import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function lgpdPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Políticas de Privacidade e Cookies</CardTitle>
          <CardDescription>Em conformidade com a Lei Geral de Proteção de Dados (LGPD)</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="privacy-policy">
              <AccordionTrigger>Política de Privacidade</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">1. Coleta de Dados</h3>
                  <p>
                    Coletamos informações pessoais que você nos fornece diretamente, como nome, endereço de e-mail e informações de contato quando você se registra em nosso site, faz uma compra ou interage conosco.
                  </p>

                  <h3 className="text-lg font-semibold">2. Uso de Dados</h3>
                  <p>
                    Utilizamos suas informações pessoais para:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Fornecer e manter nossos serviços</li>
                    <li>Processar transações e enviar notificações relacionadas</li>
                    <li>Melhorar e personalizar nossos serviços</li>
                    <li>Comunicar-nos com você sobre atualizações, ofertas e promoções</li>
                  </ul>

                  <h3 className="text-lg font-semibold">3. Compartilhamento de Dados</h3>
                  <p>
                    Não vendemos suas informações pessoais a terceiros. Podemos compartilhar dados com prestadores de serviços que nos auxiliam em nossas operações, sempre garantindo a proteção de suas informações.
                  </p>

                  <h3 className="text-lg font-semibold">4. Seus Direitos</h3>
                  <p>
                    De acordo com a LGPD, você tem direito a:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Acessar seus dados pessoais</li>
                    <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                    <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
                    <li>Revogar o consentimento para o tratamento de seus dados</li>
                  </ul>

                  <h3 className="text-lg font-semibold">5. Segurança de Dados</h3>
                  <p>
                    Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
                  </p>

                  <h3 className="text-lg font-semibold">6. Contato</h3>
                  <p>
                    Para exercer seus direitos ou esclarecer dúvidas sobre nossa política de privacidade, entre em contato conosco através do e-mail: [seu-email@exemplo.com].
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cookie-policy">
              <AccordionTrigger>Política de Cookies</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">1. O que são Cookies?</h3>
                  <p>
                    Cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de maneira mais eficiente e fornecer informações aos proprietários do site.
                  </p>

                  <h3 className="text-lg font-semibold">2. Como Usamos os Cookies</h3>
                  <p>
                    Utilizamos cookies para:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Lembrar suas preferências e configurações</li>
                    <li>Melhorar a velocidade e segurança do site</li>
                    <li>Analisar como nosso site é usado e melhorar nossos serviços</li>
                    <li>Personalizar anúncios e conteúdo com base em seus interesses</li>
                  </ul>

                  <h3 className="text-lg font-semibold">3. Tipos de Cookies que Usamos</h3>
                  <ul className="list-disc pl-6">
                    <li>Cookies essenciais: necessários para o funcionamento básico do site</li>
                    <li>Cookies de desempenho: coletam informações sobre como você usa o site</li>
                    <li>Cookies de funcionalidade: permitem que o site lembre suas escolhas</li>
                    <li>Cookies de publicidade: usados para fornecer anúncios mais relevantes</li>
                  </ul>

                  <h3 className="text-lg font-semibold">4. Gerenciamento de Cookies</h3>
                  <p>
                    Você pode controlar e/ou excluir cookies conforme desejar. Pode apagar todos os cookies já presentes em seu dispositivo e configurar a maioria dos navegadores para bloquear a instalação de cookies. No entanto, isso pode resultar na necessidade de ajustar manualmente algumas preferências sempre que visitar um site.
                  </p>

                  <h3 className="text-lg font-semibold">5. Mais Informações</h3>
                  <p>
                    Para mais informações sobre como gerenciamos cookies ou para esclarecer dúvidas, entre em contato conosco através do e-mail: [seu-email@exemplo.com].
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
