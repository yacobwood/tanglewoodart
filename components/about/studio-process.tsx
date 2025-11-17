/**
 * Studio Process Component
 * Displays the artist's creative process with steps and timeline
 */

'use client';

import { motion } from 'framer-motion';
import { Eye, Palette, Layers, Sparkles } from 'lucide-react';

const processSteps = [
  {
    icon: Eye,
    step: '01',
    title: 'Observation',
    description:
      'Daily walks along the Northumberland coast, observing the changing light and atmosphere. Photographs and quick sketches capture fleeting moments and compositional ideas.',
  },
  {
    icon: Palette,
    step: '02',
    title: 'Plein Air Studies',
    description:
      'Small oil studies painted on location, working quickly to capture the essence of light and color. These studies serve as reference for larger studio works.',
  },
  {
    icon: Layers,
    step: '03',
    title: 'Layering',
    description:
      'In the studio, building up layers of thin oil paint over weeks or months. Each layer is allowed to dry completely before the next is applied, creating luminous depth.',
  },
  {
    icon: Sparkles,
    step: '04',
    title: 'Refinement',
    description:
      'Final touches and adjustments to balance tone, color, and atmosphere. The painting is then allowed to cure before being varnished and framed.',
  },
];

export default function StudioProcess() {
  return (
    <div className="space-y-12">
      {/* Process Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="relative"
            >
              {/* Step Card */}
              <div className="card border-museum-slate/30 hover:border-museum-gold/30 transition-colors duration-500">
                {/* Icon and Step Number */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-museum-gold/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-museum-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-museum-gold/60 uppercase tracking-widest mb-1">
                      Step {step.step}
                    </div>
                    <h3 className="font-serif text-2xl text-museum-cream">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-museum-cream/70 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Line (hidden on mobile, shown on md+) */}
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-12 w-6 lg:w-12 h-px bg-gradient-to-r from-museum-gold/30 to-transparent" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Materials Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
        className="mt-16 pt-12 border-t border-museum-slate/30"
      >
        <h3 className="font-serif text-2xl text-museum-cream mb-6">
          Materials & Techniques
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="text-museum-gold text-sm uppercase tracking-wider mb-2">
              Canvas
            </h4>
            <p className="text-museum-cream/70 text-sm leading-relaxed">
              Belgian linen, triple-primed with oil ground for optimal texture and
              longevity
            </p>
          </div>
          <div>
            <h4 className="text-museum-gold text-sm uppercase tracking-wider mb-2">
              Paints
            </h4>
            <p className="text-museum-cream/70 text-sm leading-relaxed">
              Professional-grade oil paints from Michael Harding and Old Holland,
              selected for their lightfastness
            </p>
          </div>
          <div>
            <h4 className="text-museum-gold text-sm uppercase tracking-wider mb-2">
              Medium
            </h4>
            <p className="text-museum-cream/70 text-sm leading-relaxed">
              Hand-mixed blend of stand oil and odorless mineral spirits for smooth
              application
            </p>
          </div>
          <div>
            <h4 className="text-museum-gold text-sm uppercase tracking-wider mb-2">
              Brushes
            </h4>
            <p className="text-museum-cream/70 text-sm leading-relaxed">
              Rosemary & Co. hog bristle for initial layers, sable for fine details
              and glazing
            </p>
          </div>
          <div>
            <h4 className="text-museum-gold text-sm uppercase tracking-wider mb-2">
              Varnish
            </h4>
            <p className="text-museum-cream/70 text-sm leading-relaxed">
              Gamvar satin varnish, applied after 6-12 months curing for protection
              and depth
            </p>
          </div>
          <div>
            <h4 className="text-museum-gold text-sm uppercase tracking-wider mb-2">
              Timeline
            </h4>
            <p className="text-museum-cream/70 text-sm leading-relaxed">
              Each painting takes 2-6 months from initial study to completed work
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
