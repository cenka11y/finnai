import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Metadata } from 'next';

import { Button } from '@/components/ui/Button';
import { FeatureCard } from '@/components/features/FeatureCard';
import { HeroSection } from '@/components/layout/HeroSection';
import { LanguageIcon, DocumentTextIcon, MapPinIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Start your journey in Finland with personalized AI-powered guidance.',
};

export default function HomePage() {
  const t = useTranslations('home');

  const features = [
    {
      icon: LanguageIcon,
      title: t('features.language.title'),
      description: t('features.language.description'),
      href: '/learn',
      color: 'blue',
    },
    {
      icon: DocumentTextIcon,
      title: t('features.cv.title'),
      description: t('features.cv.description'),
      href: '/cv',
      color: 'green',
    },
    {
      icon: MapPinIcon,
      title: t('features.services.title'),
      description: t('features.services.description'),
      href: '/services',
      color: 'purple',
    },
    {
      icon: AcademicCapIcon,
      title: t('features.jobReadiness.title'),
      description: t('features.jobReadiness.description'),
      href: '/job-readiness',
      color: 'orange',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        description={t('hero.description')}
        primaryAction={
          <Link href="/onboarding">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              {t('hero.cta.primary')}
            </Button>
          </Link>
        }
        secondaryAction={
          <Link href="/about">
            <Button variant="outline" size="lg">
              {t('hero.cta.secondary')}
            </Button>
          </Link>
        }
      />

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {t('features.title')}
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                href={feature.href}
                color={feature.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {t('howItWorks.title')}
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {[1, 2, 3].map((step) => (
              <div key={step} className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 mx-auto mb-6">
                  <span className="text-xl font-bold text-white">{step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t(`howItWorks.steps.${step}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t(`howItWorks.steps.${step}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                {t('cta.primary')}
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                {t('cta.secondary')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
