const PixelArrow = ({ className }: { className?: string }) => (
<svg className={className} height="512" viewBox="0 0 12.7 12.7" width="512" xmlns="http://www.w3.org/2000/svg"><g id="layer1" transform="translate(169.333 -118.746)"><path id="path22267" d="m-166.15808 119.27612v11.64063h1.05885v-1.05885h1.05833v-1.05835h1.05885v-1.0578h1.05782v-.001h.00053v-1.05626h-.00053v-.001h.00053v.001h1.05885v-1.05885h-.001v-.00053h.001v.00053h1.05627v-1.05833c-.35256.00052-.70428-.00053-1.05627-.00053v-1.05834h-.001-1.05781v-1.05833h-.00053-1.05782v-1.05886h-1.05883v-1.05833h-1.05833v-1.05678z" font-variant-ligatures="normal" font-variant-position="normal" font-variant-caps="normal" font-variant-numeric="normal" font-variant-alternates="normal" font-feature-settings="normal" text-indent="0" text-align="start" text-decoration-line="none" text-decoration-style="solid" text-decoration-color="rgb(0,0,0)" text-transform="none" text-orientation="mixed" white-space="normal" shape-padding="0"  mix-blend-mode="normal" solid-color="rgb(0,0,0)" solid-opacity="1" vectorEffect="none" paintOrder="normal"/></g></svg>
);

const XIcon = ({ className }: { className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)
export { PixelArrow, XIcon};