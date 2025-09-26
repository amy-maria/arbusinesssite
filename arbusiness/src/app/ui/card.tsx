type CardProps = {
  name?: string;
  title?: string;
  subtitle?: string;
  image?: string;
  children?: React.ReactNode;
  buttonText?: string;
  language?: string;
  Icon?: React.ElementType;
  onButtonClick?: () => void;
};

export default function Card({
  language,
  Icon,
  name,
  title,
  subtitle,
  image,
  children,
  buttonText,
  onButtonClick,
}: CardProps) {
  return (
    <div className="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4">
      {/* Skill / Tech Icon */}
      {Icon && (
        <div className="hidden sm:flex items-center gap-2 bg-gray-800 text-white rounded-md p-4">
          <Icon className="w-6 h-6" />
          <span>{language}</span>
        </div>
      )}

      {/* Profile Image */}
      {image && (
        <img
          className="mx-auto block h-12 w-12 rounded-full sm:mx-0 sm:shrink-0"
          src={image}
          alt={name}
        />
      )}

      {/* Text content */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="space-y-0.5">
          {name && <p className="text-lg font-semibold text-gray-900">{name}</p>}
          {title && <p className="font-medium text-gray-500">{title}</p>}
          {subtitle && <p className="font-medium text-gray-500">{subtitle}</p>}
        </div>

        {children}

        {buttonText && (
          <button
            onClick={onButtonClick}
            className="border border-purple-200 text-purple-300 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 px-4 py-2 rounded"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
