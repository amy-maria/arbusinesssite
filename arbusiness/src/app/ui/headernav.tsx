import Link from "next/link"

const navigation = [
  { name: 'home', href: '/', current: true },
  { name: 'blog', href: '/blog', current: false },
  { name: 'about', href: '/about', current: false },
  
]


export default function HeaderNav() {
    return (
         <nav>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex shrink-0 items-center">
                      <img
                        alt="Your Company"
                        src="../assets/bengal-2476933_1280.jpg"
                        className="h-8 w-auto"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                      {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            aria-current={item.current ? 'page' : undefined}
            className={`
              ${item.current ? 'bg-gray-450/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}
              px-3 py-2 text-sm font-medium
            `}
          >
            {item.name}
          </Link>
        ))}
                        </div>
                        </div>
                        </div>
                        </nav>
    )
}