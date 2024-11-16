import Image from "next/image";

export default function LogoCloud() {
  const logos = [
    {
      name: "Transistor",
      src: "https://tailwindui.com/plus/img/logos/158x48/transistor-logo-gray-900.svg",
      className: "col-span-2 max-h-12 w-full object-contain lg:col-span-1",
    },
    {
      name: "Reform",
      src: "https://tailwindui.com/plus/img/logos/158x48/reform-logo-gray-900.svg",
      className: "col-span-2 max-h-12 w-full object-contain lg:col-span-1",
    },
    {
      name: "Tuple",
      src: "https://tailwindui.com/plus/img/logos/158x48/tuple-logo-gray-900.svg",
      className: "col-span-2 max-h-12 w-full object-contain lg:col-span-1",
    },
    {
      name: "SavvyCal",
      src: "https://tailwindui.com/plus/img/logos/158x48/savvycal-logo-gray-900.svg",
      className:
        "col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1",
    },
    {
      name: "Statamic",
      src: "https://tailwindui.com/plus/img/logos/158x48/statamic-logo-gray-900.svg",
      className:
        "col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1",
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Trusted by Leading Educational Institutions Worldwide
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {logos.map((logo) => (
            <Image
              key={logo.name}
              alt={logo.name}
              src={logo.src}
              width={158}
              height={48}
              className={logo.className}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
