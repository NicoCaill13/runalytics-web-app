import Image from "next/image";

export const IdentityPicture = () => {
    return (
        <div className="relative order-3 -mx-6 -mt-5 -mb-8 h-[340px] overflow-hidden md:order-none md:mx-0 md:mb-0 md:h-auto">
            <Image
                src="/LDLsBN01.svg"
                width={400}
                height={400}
                alt="Runner"
                className="absolute start-1/2 top-0 max-w-[300px] -translate-x-1/2"
            />

        </div>
    );
}