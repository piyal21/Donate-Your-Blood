interface BadgeProps {
  text: string;
  className?: string;
}

export default function Badge({ text, className = 'bg-gray-100 text-gray-800' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${className}`}>
      {text}
    </span>
  );
}
