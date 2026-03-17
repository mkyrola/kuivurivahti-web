'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

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

  const inputClass = 'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-charcoal placeholder-gray-400 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20 transition-colors';
  const labelClass = 'block text-sm font-medium text-charcoal mb-1.5';
  const errorClass = 'mt-1 text-xs text-fire-red';

  return (
    <div className="min-h-screen bg-off-white pt-24 pb-20 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="font-[var(--font-space-grotesk)] text-4xl font-bold text-charcoal md:text-5xl">
            {t('headline')}
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            SEEMOTO KUIVURIVAHTI
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-charcoal p-8 text-white">
              <h2 className="mb-6 font-[var(--font-space-grotesk)] text-xl font-bold">
                SEEMOTO KUIVURIVAHTI
              </h2>
              <div className="space-y-4 text-sm">
                <a href="tel:+358451259000" className="flex items-center gap-3 hover:text-orange transition-colors">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange/20">
                    <Phone className="h-4 w-4 text-orange" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">Puhelin</p>
                    <p className="font-medium">{t('phoneNumber')}</p>
                  </div>
                </a>
                <a href="mailto:kuivurivahti@seemoto.com" className="flex items-center gap-3 hover:text-orange transition-colors">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange/20">
                    <Mail className="h-4 w-4 text-orange" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">Sähköposti</p>
                    <p className="font-medium">kuivurivahti@seemoto.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange/20">
                    <MapPin className="h-4 w-4 text-orange" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">Sijainti</p>
                    <p className="font-medium">Tampere, Suomi</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-xs text-white/50 italic">
                  &ldquo;Kuivurisi vartija — näet kaiken, missä ikinä olet.&rdquo;
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-orange/20 bg-orange/5 p-6 text-sm">
              <p className="font-semibold text-charcoal mb-1">💡 Ruokavirasto-tuki</p>
              <p className="text-gray-600">
                Jopa 40% laitteistohinnasta. Me autamme hakuprosessissa — mainitse kiinnostuksesi lomakkeessa.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-safe-green/30 bg-safe-green/5 py-20 text-center">
                <CheckCircle2 className="mb-4 h-16 w-16 text-safe-green" />
                <h3 className="font-[var(--font-space-grotesk)] text-2xl font-bold text-charcoal">{t('success')}</h3>
                <p className="mt-2 text-gray-500">Palaamme asiaan mahdollisimman pian.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl bg-white p-8 shadow-sm space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
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
                <div className="grid gap-6 sm:grid-cols-2">
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
                  className="w-full rounded-full bg-orange px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-[1.01] hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? '...' : t('submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
