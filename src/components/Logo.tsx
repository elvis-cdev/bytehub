import Link from "next/link";
interface LogoProps {
  size?: number;
  showText?: boolean;
}
export default function Logo({
  size = 42,
  showText = true,
}: LogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <img
        src="/logo.png"
        alt="ByteHub"
        width={size}
        height={size}
        className="rounded-lg"
      />
      {showText && (
        <span className="text-2xl font-bold tracking-tight">
          ByteHub
        </span>
      )}
    </Link>
  );
}
