/**
 * Artist Bio Component
 * Reusable biography component with artist background and journey
 */

'use client';

import { motion } from 'framer-motion';

export default function ArtistBio() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
      className="prose prose-invert prose-lg max-w-none"
    >
      <div className="space-y-6 text-museum-cream/80 leading-relaxed">
        <p className="text-xl text-museum-cream/90 font-light">
          Dennis Wood is a contemporary oil painter whose work explores the
          delicate interplay between memory, landscape, and the passage of time. Based
          in a converted fisherman&apos;s cottage on the Northumberland coast, he has spent
          the last two decades developing a distinctive visual language that captures
          the ephemeral qualities of light and atmosphere.
        </p>

        <p>
          Born in 1978 in Yorkshire, Dennis&apos;s early years were shaped by the dramatic
          moorland landscapes of the North. She studied Fine Art at the Slade School of
          Art in London, where she graduated with distinction in 2000. During her time
          at the Slade, she was awarded the prestigious BP Portrait Award for her
          painting &ldquo;Winter Light on the Moors,&rdquo; which marked the beginning of her
          exploration into atmospheric landscape painting.
        </p>

        <p>
          After graduation, Eleanor spent several years traveling through Scandinavia,
          drawn to the quality of northern light and the minimalist aesthetic of Nordic
          culture. This period profoundly influenced her approach to composition and
          color, teaching her to find beauty in restraint and to appreciate the subtle
          gradations of tone that characterize coastal environments.
        </p>

        <p>
          In 2008, she relocated to Northumberland, where the ever-changing interplay
          between sea, sky, and land became her primary subject matter. The coastal
          landscape, with its shifting mists, dramatic tides, and quality of light,
          provides an endless source of inspiration. She works primarily en plein air
          during the initial stages, creating small studies that capture fleeting
          moments of atmosphere, which she then develops into larger works in his studio.
        </p>

        <p>
          Dennis&apos;s paintings are characterized by their contemplative quality and
          masterful handling of light. She builds her images through multiple thin
          layers of oil paint, allowing each layer to dry before applying the next.
          This painstaking process, which can take several months for a single work,
          creates a luminous depth that seems to glow from within the canvas. Her
          palette is deliberately restrained, often limiting herself to earth tones and
          muted blues and grays, punctuated by occasional moments of warmer color that
          suggest the presence of light breaking through.
        </p>

        <p>
          Her work has been exhibited widely throughout the UK and Europe, with solo
          exhibitions at prestigious galleries including the Mall Galleries in London,
          the Walker Art Gallery in Liverpool, and the BALTIC Centre for Contemporary
          Art in Gateshead. She has been featured in the Royal Academy Summer
          Exhibition on multiple occasions and is a member of the Royal Society of
          British Artists.
        </p>

        <p>
          Dennis&apos;s paintings are held in numerous private and public collections,
          including the Government Art Collection, the Ashmolean Museum in Oxford, and
          the Laing Art Gallery in Newcastle. She has been the recipient of several
          awards, including the Winsor & Newton Award for Oil Painting and the
          Derwent Art Prize.
        </p>

        <p>
          In addition to her painting practice, Eleanor is committed to arts education
          and regularly leads workshops and masterclasses at art centers throughout the
          UK. She is passionate about helping other artists develop their observational
          skills and find their own visual language for expressing the natural world.
        </p>

        <p className="text-museum-cream/90 italic">
          When not in his studio, Eleanor can be found walking the coastal paths near
          her home, often in the early morning or late evening hours when the light is
          at its most magical. These daily walks inform her work, providing both
          reference material and a deeper connection to the landscape she depicts.
        </p>
      </div>
    </motion.div>
  );
}
