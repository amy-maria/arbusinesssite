

type CardProps = {
  name: string,
  title: string,
  subtitle?: string,
  image?: string,
  children?: string,
  buttonText?: string,
  onButtonClick?: ()=> void;
}


export default function Card({ name, title, subtitle, image, children, buttonText, onButtonClick}: CardProps) {
    return (
    <div className="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4">
    {image && (<img className="mx-auto block h-6 rounded-full sm:mx-0 sm:shrink-0" src={image} alt={name}/>)}
    <div className="space-y-2 text-center sm:text-left">
    <div className="space-y-0.5">
      <p className="text-lg font-semibold text-gray">{name}</p>
      <p className="font-medium text-gray-500">{title}</p>
     {subtitle && <p className="font-medium text-gray-500">{subtitle}</p>}</div>
     {children}
        {buttonText && (
          <button
  onClick={onButtonClick}
   className="border-purple-200 text-purple-300 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">
     {buttonText}
    </button>
        )}
  </div>
</div>
    );
  }