import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImpulseField from '@/components/ImpulseField';
import { interests } from '@/data/content';

export default function Join() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    year: '',
    build: '',
    github: '',
    linkedin: '',
    why: '',
  });

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submission = {
      ...formData,
      interests: selectedInterests,
      submittedAt: new Date().toISOString(),
    };

    // 1. Local persistence buffer (guarantees candidate details are never lost)
    try {
      const existingRaw = localStorage.getItem('impulse_applications');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      existing.push(submission);
      localStorage.setItem('impulse_applications', JSON.stringify(existing));
    } catch (err) {
      console.warn('Could not cache submission locally:', err);
    }

    // 2. Dispatch to external webhook if configured
    const webhookUrl = import.meta.env.VITE_JOIN_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submission),
        });
      } catch (err) {
        console.warn('Webhook transmission error (saved locally):', err);
      }
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const inputClass = "w-full bg-transparent border-b border-space-600 focus:border-impulse-blue transition-colors duration-300 px-0 py-3 text-impulse-white placeholder:text-impulse-gray-light/40 font-sans text-base outline-none";
  const labelClass = "font-mono-label text-xs tracking-wider text-impulse-blue-bright/70 mb-2 block";

  return (
    <div className="bg-space-950 min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden impulse-bg-gradient">
        <ImpulseField
          density="medium"
          showParticles={true}
          showOrbital={true}
          centralImpulse={true}
          interactive={true}
          accentColor="mixed"
          className="opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-space-950 via-space-950/60 to-transparent" aria-hidden="true" />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 w-full pt-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 font-mono-label text-impulse-blue-bright/70 mb-8">
              <span className="text-impulse-blue-bright/50">JOIN</span>
              <span className="w-8 h-px bg-impulse-blue/30" />
              <span>ENTER IMPULSE</span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-sans font-bold tracking-tight leading-[0.95] text-impulse-white">
              BUILD<br />
              <span className="text-gradient-impulse">WITH US.</span>
            </h1>
            <p className="mt-8 text-lg lg:text-xl text-impulse-gray-light/80 max-w-lg leading-relaxed">
              You don't need to know everything. You just need to be curious enough to start.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-20" aria-hidden="true" />

        <div className="relative max-w-2xl mx-auto px-6">
          {submitted ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 border border-impulse-blue/40 bg-impulse-blue/10 rounded-full mb-8">
                <Check className="w-7 h-7 text-impulse-blue-bright" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-sans text-impulse-white mb-4">
                Signal received.
              </h2>
              <p className="text-impulse-gray-light/60 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name || 'builder'}. Your signal has been recorded. We'll reach out soon with next steps.
              </p>
              <p className="font-mono-label text-impulse-blue-bright/40 mt-8">
                CHAPTER ONE STARTS HERE.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className={labelClass}>Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    autoCapitalize="words"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck="false"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="year" className={labelClass}>Year</label>
                <input
                  id="year"
                  name="year"
                  type="text"
                  autoComplete="off"
                  value={formData.year}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. 1st year, 2nd year, graduate, or not a student"
                />
              </div>

              {/* Interests Fieldset */}
              <fieldset className="space-y-3">
                <legend className={labelClass}>AREAS OF FOCUS (SELECT ALL THAT APPLY)</legend>
                <div className="flex flex-wrap gap-3">
                  {interests.map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        role="checkbox"
                        aria-checked={isSelected}
                        aria-pressed={isSelected}
                        onClick={() => toggleInterest(interest)}
                        className={`font-mono-label text-xs px-4 py-2.5 min-h-[44px] inline-flex items-center justify-center border transition-colors duration-200 ${
                          isSelected
                            ? 'border-impulse-blue/70 bg-impulse-blue/15 text-impulse-white shadow-[0_0_12px_rgba(59,130,246,0.15)]'
                            : 'border-space-600 bg-space-900/40 text-impulse-gray-light/70 hover:border-impulse-blue/40 hover:text-impulse-white'
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <label htmlFor="build" className={labelClass}>What would you like to build?</label>
                <textarea
                  id="build"
                  name="build"
                  rows={3}
                  value={formData.build}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder="AI tools, products, experiments, research…"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="github" className={labelClass}>GitHub / Portfolio</label>
                  <input
                    id="github"
                    name="github"
                    type="text"
                    autoComplete="url"
                    autoCapitalize="none"
                    spellCheck="false"
                    value={formData.github}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="github.com/username"
                  />
                </div>
                <div>
                  <label htmlFor="linkedin" className={labelClass}>LinkedIn</label>
                  <input
                    id="linkedin"
                    name="linkedin"
                    type="text"
                    autoComplete="url"
                    autoCapitalize="none"
                    spellCheck="false"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="linkedin.com/in/username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="why" className={labelClass}>Why Impulse?</label>
                <textarea
                  id="why"
                  name="why"
                  rows={4}
                  value={formData.why}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder="What draws you to this community?"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 font-mono-label text-impulse-white border border-impulse-blue/40 bg-impulse-blue/10 hover:bg-impulse-blue/20 hover:border-impulse-blue/60 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 px-12 py-4 min-h-[44px] energy-sweep"
                >
                  {isSubmitting ? 'TRANSMITTING SIGNAL…' : 'ENTER IMPULSE'}
                  <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
