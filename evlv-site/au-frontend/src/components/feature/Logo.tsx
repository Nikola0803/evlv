type LogoProps = {
  variant?: 'dark' | 'light';
  className?: string;
  alt?: string;
};

const LOGO_DARK =
  'https://storage.helloreaddy.io/project_files/2aee507e-0cec-4e32-b3e1-9c5781782e46/0754ede4-6e8a-4ef6-b5f4-161b42e51e2d_compressed_EVLV-logo-dark.webp';
const LOGO_LIGHT =
  'https://storage.helloreaddy.io/project_files/2aee507e-0cec-4e32-b3e1-9c5781782e46/34f36340-a0e7-44c6-a317-6a69035ae0b5_compressed_evlv-white-logo.webp';

export default function Logo({ variant = 'dark', className = 'w-[92px] h-auto', alt = 'EVLV' }: LogoProps) {
  return (
    <img
      src={variant === 'light' ? LOGO_LIGHT : LOGO_DARK}
      alt={alt}
      className={`${className} object-contain`}
    />
  );
}

export { LOGO_DARK, LOGO_LIGHT };