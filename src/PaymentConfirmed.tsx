import { ArrowLeft, Check, Mail, ReceiptText, ShieldCheck } from 'lucide-react'

function BrandLogo() {
  return (
    <a href="/" className="flex items-center gap-2.5" aria-label="Diamond Design System home">
      <span className="relative grid size-7 place-items-center text-[#6f93ff]"><span className="absolute size-[19px] rotate-45 border border-[#7fa0ff]/80 shadow-[0_0_10px_rgba(79,125,255,.24)]"/><span className="relative text-[8px] font-bold tracking-[-0.02em] text-white">D</span></span>
      <span className="flex flex-col uppercase leading-none"><span className="text-[10px] font-semibold tracking-[0.16em] text-white">Diamond</span><span className="mt-1 text-[6px] font-medium tracking-[0.28em] text-white/55">Design System</span></span>
    </a>
  )
}

export default function PaymentConfirmed() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030407] text-white selection:bg-[#4f7dff] selection:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(66,112,255,.20),transparent_28%),radial-gradient(circle_at_75%_80%,rgba(32,71,190,.12),transparent_32%)]"/>
      <header className="relative z-10 border-b border-white/10 bg-[#030407]/75 backdrop-blur-xl"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8"><BrandLogo/><a href="/" className="flex items-center gap-2 text-sm text-white/55 transition hover:text-white"><ArrowLeft size={16}/>Back to site</a></div></header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl items-center justify-center px-6 py-16 lg:px-8">
        <div className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-[#648aff]/25 bg-white/[0.035] shadow-[0_28px_100px_rgba(0,0,0,.45)] backdrop-blur-xl">
          <div className="border-b border-white/10 px-7 py-10 text-center sm:px-12 sm:py-12">
            <div className="mx-auto mb-7 grid size-20 place-items-center rounded-full border border-[#6d94ff]/35 bg-[#4f7dff]/10 text-[#89a6ff] shadow-[0_0_50px_rgba(79,125,255,.25)]"><Check size={38} strokeWidth={2}/></div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.30em] text-[#6f93ff]">Payment received</p>
            <h1 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Welcome to Diamond Design System</h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/58">Thanks for your purchase. Square will send your payment receipt to the email used at checkout. Your Diamond Design System access instructions will be provided separately.</p>
          </div>

          <div className="grid gap-px bg-white/10 sm:grid-cols-3">
            <div className="bg-[#06080d] p-7 text-center"><ReceiptText className="mx-auto mb-4 text-[#6f93ff]" size={24}/><h2 className="text-sm font-semibold">Check your receipt</h2><p className="mt-2 text-xs leading-5 text-white/42">Look for your Square payment confirmation email.</p></div>
            <div className="bg-[#06080d] p-7 text-center"><Mail className="mx-auto mb-4 text-[#6f93ff]" size={24}/><h2 className="text-sm font-semibold">Watch your inbox</h2><p className="mt-2 text-xs leading-5 text-white/42">Plugin access and setup instructions will be sent to you.</p></div>
            <div className="bg-[#06080d] p-7 text-center"><ShieldCheck className="mx-auto mb-4 text-[#6f93ff]" size={24}/><h2 className="text-sm font-semibold">Keep your receipt</h2><p className="mt-2 text-xs leading-5 text-white/42">It can help us locate your purchase if you need support.</p></div>
          </div>

          <div className="flex flex-col items-center gap-4 px-7 py-9 text-center sm:px-12">
            <a href="/" className="inline-flex min-w-56 items-center justify-center rounded-xl bg-gradient-to-r from-[#4b72ff] to-[#6a8cff] px-7 py-4 text-sm font-semibold shadow-[0_0_35px_rgba(79,125,255,.30)] transition hover:scale-[1.02]">Return to Diamond Design System</a>
            <p className="text-xs text-white/35">This page confirms that you returned from checkout. Final payment verification is handled by Square.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
