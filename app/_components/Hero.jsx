import React from "react";
import { Button } from "../components/ui/button";
import Link from "next/link";
import Image from "next/image";

function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "80vh" }}>
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-2 lg:gap-16 ">
          <div className="relative lg:h-100 lg:order-last lg:h-full">
            <div>
              <Image
                alt="main-image"
                src="/relaxing.jpg"
                width={400}
                height={500}
                className="w-full max-w-xs h-auto sm:w-[400px] sm:h-[500px] object-cover rounded-lg shadow-image mx-auto"
                priority 
              />
            </div>
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl text-[#374151] dark:text-[#e5e7eb]">
              Finde deinen
                <span className="text-[#374151] dark:text-[#e5e7eb]"> Spezialisten</span>
            </h2>

            <p className="mt-4 text-black dark:text-[#e5e7eb]">
              Willkommen bei Beauty Booking – der Plattform, auf der Schönheit ihre Meister findet! Bei uns ist jeder Meister nicht nur ein Handwerker, sondern ein wahrer Künstler, der die Kunst der Pflege perfekt beherrscht. Wir bieten Meistern eine einzigartige Möglichkeit, ihre Dienstleistungen zu präsentieren, ihren Stil und ihre Fähigkeiten hervorzuheben, neue Kunden zu gewinnen und ihren festen Kundenstamm zu erweitern. Auf Beauty Booking finden Sie ein breites Spektrum an Dienstleistungen – von Hautpflege über Make-up, von Maniküre bis hin zu Haarstyling. Werden Sie Teil unserer Community, um die besten Meister zu entdecken und den perfekten Spezialisten zu finden, der Ihren Tag noch schöner macht.
            </p>

            <Link href="/explorePage" passHref>
              <Button
                className="mt-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300"
                style={{ backgroundColor: "#006400ff", color: "#ffffff" }}
              >
                Meister in der Nähe
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;