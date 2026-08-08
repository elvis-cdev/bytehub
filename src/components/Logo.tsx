import Image from "next/image";
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
      <Image
        src="/logo.png"
        alt="ByteHub"
        width={size}
        height={size}
        priority
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
