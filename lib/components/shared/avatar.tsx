type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarShape = 'rounded' | 'circle' | 'square';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: AvatarSize;
  shape?: AvatarShape;
  thumbnail?: boolean;
}

const Avatar = ({ 
  size = 'md', 
  shape = 'rounded', 
  thumbnail = false,
  className = '', 
  ...props 
}: AvatarProps) => {
  
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  }[size];

  const shapeClasses = {
    rounded: 'rounded-lg',
    circle: 'rounded-full',
    square: 'rounded-none',
  }[shape];

  const thumbnailClasses = thumbnail 
    ? 'p-1 bg-slate-800 border border-slate-700' 
    : '';

  return (
    <img 
      className={`object-cover ${sizeClasses} ${shapeClasses} ${thumbnailClasses} ${className}`}
      {...props}
    />
  );
};

export default Avatar;