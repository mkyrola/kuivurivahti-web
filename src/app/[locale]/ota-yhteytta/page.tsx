'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal('')),
  location: z.string().optional(),
  dryerBrand: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function OtaYhteyttaPage() {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 focus:border-orange/50 focus:outline-none focus:ring-2 focus:ring-orange/20 transition-colors backdrop-blur-sm';
  const labelClass = 'block text-xs font-bold uppercase tracking-widest text-white/40 data-mono mb-2';
  const errorClass = 'mt-1 text-xs text-fire-red data-mono';

  return (
    <div className="relative min-h-screen bg-night-deep pt-28 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-dark pointer-events-none" />
      {/* Ambient orb */}
      <div className="absolute top-20 right-1/4 h-[400px] w-[400px] rounded-full bg-orange/8 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="mb-3 data-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange/50">Contact</p>
          <h1 className="font-[var(--font-space-grotesk)] text-4xl font-bold text-white md:text-5xl tracking-tight">
            {t('headline')}
          </h1>
          <p className="mt-3 text-sm text-white/35">SEEMOTO KUIVURIVAHTI</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="glass-card rounded-2xl p-7">
              <h2 className="mb-5 font-[var(--font-space-grotesk)] text-base font-bold text-white">
                SEEMOTO <span className="text-orange">KUIVURIVAHTI</span>
              </h2>
              <div className="space-y-4 text-sm">
                <a href="tel:+358451259000" className="flex items-center gap-3 hover:text-orange transition-colors group">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange/10 group-hover:bg-orange/20 transition-colors">
                    <Phone className="h-4 w-4 text-orange" />
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] data-mono uppercase">Puhelin</p>
                    <p className="font-medium text-white/70 data-mono">{t('phoneNumber')}</p>
                  </div>
                </a>
                <a href="mailto:kuivurivahti@seemoto.com" className="flex items-center gap-3 hover:text-orange transition-colors group">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange/10 group-hover:bg-orange/20 transition-colors">
                    <Mail className="h-4 w-4 text-orange" />
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] data-mono uppercase">Sähköposti</p>
                    <p className="font-medium text-white/70 data-mono">kuivurivahti@seemoto.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                    <MapPin className="h-4 w-4 text-white/40" />
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] data-mono uppercase">Sijainti</p>
                    <p className="font-medium text-white/50">Tampere, Suomi</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-white/5 pt-5">
                <p className="text-xs text-white/25 italic leading-relaxed">
                  &ldquo;Kuivurisi vartija — näet kaiken, missä ikinä olet.&rdquo;
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-orange/10 via-grain-gold/5 to-transparent border border-orange/10 p-5">
              <p className="font-[var(--font-space-grotesk)] font-bold text-white text-sm mb-1">💡 Ruokavirasto-tuki</p>
              <p className="text-xs text-white/45 leading-relaxed">
                Jopa 40% laitteistohinnasta. Me autamme hakuprosessissa — mainitse kiinnostuksesi lomakkeessa.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center glass-card rounded-2xl border border-safe-green/20 py-20 text-center">
                <CheckCircle2 className="mb-4 h-14 w-14 text-safe-green" />
                <h3 className="font-[var(--font-space-grotesk)] text-2xl font-bold text-white">{t('success')}</h3>
                <p className="mt-2 text-sm text-white/40">Palaamme asiaan mahdollisimman pian.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="glass-card rounded-2xl p-7 md:p-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>{t('name')} *</label>
                    <input {...register('name')} placeholder="Mauri Mäkinen" className={inputClass} />
                    {errors.name && <p className={errorClass}>Nimi on pakollinen</p>}
                  </div>
                  <div>
                    <label className={labelClass}>{t('phone')} *</label>
                    <input {...register('phone')} placeholder="+358 40 123 4567" className={inputClass} />
                    {errors.phone && <p className={errorClass}>Puhelinnumero on pakollinen</p>}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>{t('email')}</label>
                  <input {...register('email')} type="email" placeholder="mauri@tila.fi" className={inputClass} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>{t('location')}</label>
                    <input {...register('location')} placeholder="Seinäjoki" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{t('dryerBrand')}</label>
                    <input {...register('dryerBrand')} placeholder="Antti, Mepu..." className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>{t('message')}</label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Kerro tilanteestasi..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange to-grain-gold/80 px-8 py-4 text-base font-bold text-white transition-all hover:brightness-110 hover-glow-orange disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? '...' : t('submit')}
                  {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
