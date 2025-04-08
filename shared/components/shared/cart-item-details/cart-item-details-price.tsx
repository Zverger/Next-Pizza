import { cn } from "@/shared/lib";

interface Props {
  value: number;
  loading?: boolean;
  className?: string;
}

export const CartItemDetailsPrice: React.FC<Props> = ({
  value,
  loading,
  className,
}) => {
  return (
    <h2
      className={cn(
        "font-bold",
        { "text-gray-300 animate-pulse": loading },
        className
      )}
    >
      {value} ₽
    </h2>
  );
};
