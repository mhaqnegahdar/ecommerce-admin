// Types
import { HeadingProps } from "@/types/props";

const Heading = ({ title, description, className }: HeadingProps) => {
  return (
    <div className={`${className}`}>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className=" text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
