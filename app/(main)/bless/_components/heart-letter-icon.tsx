import Image from 'next/image';

export default function HeartLetterIcon() {
  return (
    <Image
      src="/bless/heart.png"
      alt=""
      width={160}
      height={170}
      className="select-none"
      draggable={false}
      priority
    />
  );
}
