'use client';
interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="text-red-600 text-sm font-semibold">
      {message}
    </div>
  );
}
